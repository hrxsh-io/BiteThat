import { useEffect, useMemo, useState } from "react";
import {
    User,
    Mail,
    Phone,
    MapPin,
    Pencil,
    Save,
    X,
    Camera,
    ShieldCheck,
    Heart,
    ShoppingBag,
    Coins,
    ChevronRight,
    Plus,
    Home,
    Briefcase,
    LogOut,
    Lock,
    CheckCircle2,
    Clock3,
} from "lucide-react";

import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { updateProfile } from "../services/authApi";

export default function Profile() {
    const { user, token, updateUser, logout } = useAuth();
    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
    });

    /*
    ============================================================
    INITIALIZE FORM FROM AUTH USER
    ============================================================
    */

    useEffect(() => {
        if (!user) return;

        const nameParts = user.name?.trim().split(" ") || [];

        setFormData({
            firstName: nameParts[0] || "",
            lastName: nameParts.slice(1).join(" ") || "",
            phone: user.phone || "",
        });
    }, [user]);

    /*
    ============================================================
    DERIVED DATA
    ============================================================
    */

    const fullName = user?.name || "BiteThat User";

    const initials = useMemo(() => {
        if (!fullName) return "BT";

        return fullName
            .split(" ")
            .filter(Boolean)
            .slice(0, 2)
            .map((part) => part[0].toUpperCase())
            .join("");
    }, [fullName]);

    const addresses = user?.addresses || [];

    /*
    ============================================================
    FORM HANDLERS
    ============================================================
    */

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setSuccessMessage("");
        setErrorMessage("");
    };

    const handleCancelEdit = () => {
        if (!user) return;

        const nameParts = user.name?.trim().split(" ") || [];

        setFormData({
            firstName: nameParts[0] || "",
            lastName: nameParts.slice(1).join(" ") || "",
            phone: user.phone || "",
        });

        setIsEditing(false);
        setErrorMessage("");
        setSuccessMessage("");
    };

    /*
    ============================================================
    SAVE PROFILE
    ============================================================
    */

    const handleSaveProfile = async () => {
        if (!token) {
            navigate("/login");
            return;
        }

        if (!formData.firstName.trim()) {
            setErrorMessage("First name is required.");
            return;
        }

        setSaving(true);
        setSuccessMessage("");
        setErrorMessage("");

        try {
            const response = await updateProfile(token, {
                name: `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim(),
                phone: formData.phone.trim(),
            });

            if (response?.user) {
                updateUser(response.user);
            }

            setIsEditing(false);
            setSuccessMessage("Your profile has been updated successfully.");

            setTimeout(() => {
                setSuccessMessage("");
            }, 3000);
        } catch (error) {
            console.error("Profile update error:", error);

            setErrorMessage(
                error.response?.data?.message ||
                    "Unable to update your profile. Please try again."
            );
        } finally {
            setSaving(false);
        }
    };

    /*
    ============================================================
    LOGOUT
    ============================================================
    */

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    /*
    ============================================================
    PROTECTION
    ============================================================
    */

    if (!user) {
        return (
            <main className="min-h-screen bg-slate-50">
                <div className="mx-auto flex min-h-screen max-w-xl items-center justify-center px-6">
                    <div className="w-full rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-xl shadow-slate-200/40">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
                            <User size={30} />
                        </div>

                        <h1 className="mt-6 text-2xl font-bold text-slate-950">
                            Sign in to view your profile
                        </h1>

                        <p className="mt-3 text-sm leading-6 text-slate-500">
                            Log in to manage your account, addresses, orders and
                            BiteCoins.
                        </p>

                        <Link
                            to="/login"
                            className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-violet-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-600/20 transition hover:bg-violet-700"
                        >
                            Sign in
                            <ChevronRight size={17} />
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    /*
    ============================================================
    RENDER
    ============================================================
    */

    return (
        <main className="min-h-screen bg-slate-50 pb-16">
            {/* ==================================================
                PAGE HEADER / HERO
            ================================================== */}

            <section className="relative overflow-hidden bg-slate-950">
                {/* Decorative gradients */}
                <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet-600/30 blur-3xl" />

                <div className="absolute -bottom-40 right-0 h-[28rem] w-[28rem] rounded-full bg-fuchsia-500/20 blur-3xl" />

                <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
                    >
                        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                            {/* Avatar */}
                            <div className="relative">
                                <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-br from-violet-500 to-fuchsia-500 text-3xl font-bold text-white shadow-2xl shadow-violet-950/40">
                                    {user.avatar ? (
                                        <img
                                            src={user.avatar}
                                            alt={fullName}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        initials
                                    )}
                                </div>

                                {isEditing && (
                                    <button
                                        type="button"
                                        className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-xl border-4 border-slate-950 bg-white text-slate-700 shadow-lg transition hover:bg-slate-100"
                                        aria-label="Change profile picture"
                                    >
                                        <Camera size={17} />
                                    </button>
                                )}
                            </div>

                            {/* Identity */}
                            <div>
                                <div className="mb-3 flex flex-wrap items-center gap-2">
                                    <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1.5 text-xs font-semibold text-violet-300">
                                        <CheckCircle2 size={13} />
                                        {user.role === "user"
                                            ? "BiteThat Member"
                                            : user.role}
                                    </span>

                                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-400">
                                        <ShieldCheck size={13} />
                                        Account secured
                                    </span>
                                </div>

                                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                    {fullName}
                                </h1>

                                <p className="mt-2 flex items-center gap-2 text-sm text-slate-400">
                                    <Mail size={15} />
                                    {user.email}
                                </p>
                            </div>
                        </div>

                        {/* Edit button */}
                        {!isEditing ? (
                            <button
                                type="button"
                                onClick={() => setIsEditing(true)}
                                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-5 py-3.5 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/15"
                            >
                                <Pencil size={17} />
                                Edit profile
                            </button>
                        ) : (
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={handleCancelEdit}
                                    disabled={saving}
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm font-bold text-slate-300 transition hover:bg-white/10 disabled:opacity-50"
                                >
                                    <X size={17} />
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    onClick={handleSaveProfile}
                                    disabled={saving}
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-900/30 transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    <Save size={17} />
                                    {saving ? "Saving..." : "Save changes"}
                                </button>
                            </div>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* ==================================================
                MAIN CONTENT
            ================================================== */}

            <div className="mx-auto max-w-7xl px-6 pt-8 lg:px-8">
                {/* Success / Error */}
                {successMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-700"
                    >
                        <CheckCircle2 size={18} />
                        {successMessage}
                    </motion.div>
                )}

                {errorMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-600"
                    >
                        {errorMessage}
                    </motion.div>
                )}

                {/* ==================================================
                    STAT CARDS
                ================================================== */}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
                >
                    <StatCard
                        icon={ShoppingBag}
                        label="Total orders"
                        value="0"
                        description="Your BiteThat journey"
                    />

                    <StatCard
                        icon={Clock3}
                        label="Active orders"
                        value="0"
                        description="Nothing on the way"
                    />

                    <StatCard
                        icon={Heart}
                        label="Favorites"
                        value="0"
                        description="Restaurants you love"
                    />

                    <StatCard
                        icon={Coins}
                        label="BiteCoins"
                        value="0"
                        description="Available rewards"
                    />
                </motion.div>

                {/* ==================================================
                    CONTENT GRID
                ================================================== */}

                <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
                    {/* LEFT */}
                    <div className="space-y-8">
                        {/* Personal information */}
                        <ProfileCard
                            title="Personal information"
                            description="Your basic account information"
                            icon={User}
                        >
                            <div className="grid gap-5 sm:grid-cols-2">
                                <ProfileField
                                    label="First name"
                                    icon={User}
                                    value={formData.firstName}
                                    name="firstName"
                                    editing={isEditing}
                                    onChange={handleChange}
                                />

                                <ProfileField
                                    label="Last name"
                                    icon={User}
                                    value={formData.lastName}
                                    name="lastName"
                                    editing={isEditing}
                                    onChange={handleChange}
                                />

                                <ProfileField
                                    label="Email address"
                                    icon={Mail}
                                    value={user.email || ""}
                                    disabled
                                    helper="Email cannot be changed here."
                                />

                                <ProfileField
                                    label="Phone number"
                                    icon={Phone}
                                    value={formData.phone}
                                    name="phone"
                                    editing={isEditing}
                                    onChange={handleChange}
                                    placeholder="Add phone number"
                                />
                            </div>
                        </ProfileCard>

                        {/* Addresses */}
                        <ProfileCard
                            title="Saved addresses"
                            description="Manage your delivery locations"
                            icon={MapPin}
                            action={
                                <button
                                    type="button"
                                    className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold text-violet-600 transition hover:bg-violet-50"
                                >
                                    <Plus size={15} />
                                    Add address
                                </button>
                            }
                        >
                            {addresses.length === 0 ? (
                                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-8 text-center">
                                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
                                        <MapPin size={24} />
                                    </div>

                                    <h3 className="mt-4 text-sm font-bold text-slate-900">
                                        No saved addresses
                                    </h3>

                                    <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-slate-500">
                                        Add your home, work, college or other delivery
                                        locations for a faster checkout.
                                    </p>

                                    <button
                                        type="button"
                                        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-violet-700"
                                    >
                                        <Plus size={15} />
                                        Add your first address
                                    </button>
                                </div>
                            ) : (
                                <div className="grid gap-4 sm:grid-cols-2">
                                    {addresses.map((address, index) => (
                                        <AddressCard
                                            key={address._id || index}
                                            address={address}
                                        />
                                    ))}
                                </div>
                            )}
                        </ProfileCard>

                        {/* Preferences */}
                        <ProfileCard
                            title="Food preferences"
                            description="Personalize your BiteThat experience"
                            icon={Heart}
                        >
                            <div className="grid gap-4 sm:grid-cols-2">
                                <PreferenceItem
                                    title="Favorite cuisines"
                                    description="Manage cuisines used for recommendations"
                                    icon={Heart}
                                />

                                <PreferenceItem
                                    title="Dietary preferences"
                                    description="Help us recommend food for you"
                                    icon={CheckCircle2}
                                />

                                <PreferenceItem
                                    title="Notifications"
                                    description="Control order and promotional alerts"
                                    icon={Clock3}
                                />

                                <PreferenceItem
                                    title="Recommendation settings"
                                    description="Customize your food discovery"
                                    icon={ShoppingBag}
                                />
                            </div>
                        </ProfileCard>
                    </div>

                    {/* RIGHT */}
                    <aside className="space-y-6">
                        {/* Account overview */}
                        <ProfileCard
                            title="Account"
                            description="Manage your BiteThat account"
                            icon={ShieldCheck}
                        >
                            <div className="space-y-2">
                                <AccountLink
                                    icon={Lock}
                                    title="Password & security"
                                    description="Manage your password"
                                    onClick={() => navigate("/forgot-password")}
                                />

                                <AccountLink
                                    icon={ShoppingBag}
                                    title="Order history"
                                    description="View your previous orders"
                                    onClick={() => navigate("/orders")}
                                />

                                <AccountLink
                                    icon={Heart}
                                    title="Favorites"
                                    description="Restaurants and dishes you saved"
                                />

                                <AccountLink
                                    icon={Coins}
                                    title="BiteCoins"
                                    description="View your rewards balance"
                                />
                            </div>
                        </ProfileCard>

                        {/* Quick actions */}
                        <div className="rounded-3xl bg-gradient-to-br from-violet-600 to-fuchsia-600 p-6 text-white shadow-xl shadow-violet-600/20">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md">
                                <ShoppingBag size={21} />
                            </div>

                            <h3 className="mt-5 text-xl font-bold">
                                Hungry already?
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-violet-100">
                                Discover restaurants, explore new dishes and place
                                your next order.
                            </p>

                            <Link
                                to="/restaurants"
                                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-xs font-bold text-violet-700 transition hover:bg-violet-50"
                            >
                                Explore restaurants
                                <ChevronRight size={15} />
                            </Link>
                        </div>

                        {/* Logout */}
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-red-200 bg-white px-5 py-3.5 text-sm font-bold text-red-500 transition hover:bg-red-50"
                        >
                            <LogOut size={17} />
                            Sign out
                        </button>
                    </aside>
                </div>
            </div>
        </main>
    );
}

/*
============================================================
STAT CARD
============================================================
*/

function StatCard({ icon: Icon, label, value, description }) {
    return (
        <div className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/50">
            <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 transition group-hover:bg-violet-600 group-hover:text-white">
                    <Icon size={20} />
                </div>

                <ChevronRight
                    size={17}
                    className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-violet-400"
                />
            </div>

            <p className="mt-5 text-2xl font-bold text-slate-950">
                {value}
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-700">
                {label}
            </p>

            <p className="mt-1 text-xs text-slate-400">
                {description}
            </p>
        </div>
    );
}

/*
============================================================
PROFILE CARD
============================================================
*/

function ProfileCard({
    title,
    description,
    icon: Icon,
    action,
    children,
}) {
    return (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
            <div className="mb-6 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                        <Icon size={19} />
                    </div>

                    <div>
                        <h2 className="text-base font-bold text-slate-950">
                            {title}
                        </h2>

                        <p className="mt-1 text-xs leading-5 text-slate-400">
                            {description}
                        </p>
                    </div>
                </div>

                {action}
            </div>

            {children}
        </section>
    );
}

/*
============================================================
PROFILE FIELD
============================================================
*/

function ProfileField({
    label,
    icon: Icon,
    value,
    name,
    editing,
    onChange,
    disabled = false,
    helper,
    placeholder,
}) {
    return (
        <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                {label}
            </label>

            {editing && !disabled ? (
                <div className="relative">
                    <Icon
                        size={16}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                        type="text"
                        name={name}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                    />
                </div>
            ) : (
                <div
                    className={`flex min-h-[50px] items-center gap-3 rounded-2xl border px-4 py-3 ${
                        disabled
                            ? "border-slate-100 bg-slate-50"
                            : "border-slate-200 bg-white"
                    }`}
                >
                    <Icon size={16} className="shrink-0 text-slate-400" />

                    <span
                        className={`truncate text-sm ${
                            value
                                ? "font-medium text-slate-800"
                                : "text-slate-400"
                        }`}
                    >
                        {value || "Not added"}
                    </span>
                </div>
            )}

            {helper && (
                <p className="mt-1.5 text-[11px] text-slate-400">
                    {helper}
                </p>
            )}
        </div>
    );
}

/*
============================================================
ADDRESS CARD
============================================================
*/

function AddressCard({ address }) {
    const label = address.label || "Address";

    const AddressIcon =
        label.toLowerCase() === "home"
            ? Home
            : label.toLowerCase() === "work"
            ? Briefcase
            : MapPin;

    return (
        <div className="rounded-2xl border border-slate-200 p-5 transition hover:border-violet-200 hover:shadow-sm">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                        <AddressIcon size={18} />
                    </div>

                    <div>
                        <p className="text-sm font-bold text-slate-900">
                            {label}
                        </p>

                        {address.isDefault && (
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-violet-600">
                                Default
                            </span>
                        )}
                    </div>
                </div>

                <button
                    type="button"
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                >
                    <Pencil size={15} />
                </button>
            </div>

            <p className="mt-4 text-xs leading-5 text-slate-500">
                {address.address ||
                    address.street ||
                    "Saved delivery address"}
            </p>
        </div>
    );
}

/*
============================================================
PREFERENCE ITEM
============================================================
*/

function PreferenceItem({ title, description, icon: Icon }) {
    return (
        <button
            type="button"
            className="group flex items-center gap-4 rounded-2xl border border-slate-200 p-4 text-left transition hover:border-violet-200 hover:bg-violet-50/40"
        >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition group-hover:bg-violet-100 group-hover:text-violet-600">
                <Icon size={18} />
            </div>

            <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-slate-800">
                    {title}
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-400">
                    {description}
                </p>
            </div>

            <ChevronRight
                size={16}
                className="shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-violet-500"
            />
        </button>
    );
}

/*
============================================================
ACCOUNT LINK
============================================================
*/

function AccountLink({ icon: Icon, title, description, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="group flex w-full items-center gap-4 rounded-2xl p-3 text-left transition hover:bg-slate-50"
        >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition group-hover:bg-violet-100 group-hover:text-violet-600">
                <Icon size={17} />
            </div>

            <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-slate-800">
                    {title}
                </p>

                <p className="mt-0.5 truncate text-xs text-slate-400">
                    {description}
                </p>
            </div>

            <ChevronRight
                size={16}
                className="shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-violet-500"
            />
        </button>
    );
}
