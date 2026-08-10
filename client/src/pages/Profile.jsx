
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

import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";



import { useAuth } from "../context/AuthContext";
import {
    updateProfile,
    addAddress,
    updateAddress,
    deleteAddress,
} from "../services/authApi";

export default function Profile() {


    const [editingAddress, setEditingAddress] = useState(null);
    const [deletingAddressId, setDeletingAddressId] = useState(null);
    const { user, token, updateUser, logout } = useAuth();
    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // ==========================================
    // ADDRESS MODAL
    // ==========================================

    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [addressSaving, setAddressSaving] = useState(false);
    const [addressError, setAddressError] = useState("");

    const [addressForm, setAddressForm] = useState({
        label: "Home",
        addressLine: "",
        city: "",
        state: "",
        pincode: "",
        landmark: "",
    });

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
    });

    // ==========================================
    // INITIALIZE PROFILE FORM
    // ==========================================

    useEffect(() => {
        if (!user) return;

        const nameParts = user.name?.trim().split(" ") || [];

        setFormData({
            firstName: nameParts[0] || "",
            lastName: nameParts.slice(1).join(" ") || "",
            phone: user.phone || "",
        });
    }, [user]);

    // ==========================================
    // DERIVED DATA
    // ==========================================

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

    // ==========================================
    // PROFILE FORM HANDLERS
    // ==========================================

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

    // ==========================================
    // SAVE PROFILE
    // ==========================================

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
            setSuccessMessage(
                "Your profile has been updated successfully."
            );

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

    // ==========================================
    // ADDRESS MODAL
    // ==========================================

    const openAddressModal = () => {
        setEditingAddress(null);

        setAddressForm({
            label: "Home",
            addressLine: "",
            city: "",
            state: "",
            pincode: "",
            landmark: "",
        });

        setAddressError("");
        setIsAddressModalOpen(true);
    };

    const openEditAddressModal = (address) => {
        setEditingAddress(address);

        setAddressForm({
            label: address.label || "Home",
            addressLine: address.addressLine || "",
            city: address.city || "",
            state: address.state || "",
            pincode: address.pincode || "",
            landmark: address.landmark || "",
        });

        setAddressError("");
        setIsAddressModalOpen(true);
    };

    const closeAddressModal = () => {
        if (addressSaving) return;

        setIsAddressModalOpen(false);
        setEditingAddress(null);
        setAddressError("");
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;

        setAddressForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        setAddressError("");
    };

    // ==========================================
    // SAVE ADDRESS
    // ADD + EDIT
    // ==========================================

    const handleSaveAddress = async (e) => {
        e.preventDefault();

        if (!token) {
            navigate("/login");
            return;
        }

        if (!addressForm.addressLine.trim()) {
            setAddressError("Address line is required.");
            return;
        }

        if (!addressForm.city.trim()) {
            setAddressError("City is required.");
            return;
        }

        if (addressForm.pincode.trim()) {
            if (!/^\d{6}$/.test(addressForm.pincode.trim())) {
                setAddressError(
                    "Please enter a valid 6-digit pincode."
                );
                return;
            }
        }

        setAddressSaving(true);
        setAddressError("");

        const addressData = {
            label: addressForm.label.trim() || "Home",
            addressLine: addressForm.addressLine.trim(),
            city: addressForm.city.trim(),
            state: addressForm.state.trim(),
            pincode: addressForm.pincode.trim(),
            landmark: addressForm.landmark.trim(),
        };

        try {
            // ==========================================
            // EDIT EXISTING ADDRESS
            // ==========================================

            if (editingAddress) {
                const addressId = editingAddress._id;

                const response = await updateAddress(
                    token,
                    addressId,
                    addressData
                );

                if (response?.addresses) {
                    updateUser({
                        ...user,
                        addresses: response.addresses,
                    });
                } else if (response?.address) {
                    updateUser({
                        ...user,
                        addresses: (user.addresses || []).map(
                            (address) =>
                                address._id === addressId
                                    ? response.address
                                    : address
                        ),
                    });
                }

                setIsAddressModalOpen(false);
                setEditingAddress(null);

                setSuccessMessage(
                    "Your address has been updated successfully."
                );

                setTimeout(() => {
                    setSuccessMessage("");
                }, 3000);

                return;
            }

            // ==========================================
            // ADD NEW ADDRESS
            // ==========================================

            const response = await addAddress(
                token,
                addressData
            );

            if (response?.addresses) {
                updateUser({
                    ...user,
                    addresses: response.addresses,
                });
            } else if (response?.address) {
                updateUser({
                    ...user,
                    addresses: [
                        ...(user?.addresses || []),
                        response.address,
                    ],
                });
            }

            setIsAddressModalOpen(false);

            setSuccessMessage(
                "Your address has been added successfully."
            );

            setTimeout(() => {
                setSuccessMessage("");
            }, 3000);
        } catch (error) {
            console.error(
                editingAddress
                    ? "Update address error:"
                    : "Add address error:",
                error
            );

            setAddressError(
                error.response?.data?.message ||
                `Unable to ${editingAddress ? "update" : "add"
                } address. Please try again.`
            );
        } finally {
            setAddressSaving(false);
        }
    };

    // ==========================================
    // DELETE ADDRESS
    // ==========================================

    const handleDeleteAddress = async (address) => {
        if (!token) {
            navigate("/login");
            return;
        }

        const addressId = address?._id;

        if (!addressId) {
            setErrorMessage("Unable to delete this address.");
            return;
        }

        const confirmed = window.confirm(
            `Are you sure you want to delete your "${address.label || "Address"}" address?`
        );

        if (!confirmed) return;

        setDeletingAddressId(addressId);
        setErrorMessage("");

        try {
            const response = await deleteAddress(
                token,
                addressId
            );

            if (response?.addresses) {
                updateUser({
                    ...user,
                    addresses: response.addresses,
                });
            } else {
                updateUser({
                    ...user,
                    addresses: (user.addresses || []).filter(
                        (item) => item._id !== addressId
                    ),
                });
            }

            setSuccessMessage(
                "Your address has been deleted successfully."
            );

            setTimeout(() => {
                setSuccessMessage("");
            }, 3000);
        } catch (error) {
            console.error("Delete address error:", error);

            setErrorMessage(
                error.response?.data?.message ||
                "Unable to delete address. Please try again."
            );
        } finally {
            setDeletingAddressId(null);
        }
    };


    // ==========================================
    // LOGOUT
    // ==========================================

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    // ==========================================
    // PROTECTION
    // ==========================================

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
                            Log in to manage your account, addresses, orders
                            and BiteCoins.
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

    // ==========================================
    // RENDER
    // ==========================================

    return (
        <>
            <main className="min-h-screen bg-slate-50 pb-16">
                {/* ==========================================
                    PAGE HEADER / HERO
                ========================================== */}

                <section className="relative overflow-hidden bg-slate-950">
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
                                {/* PROFILE PHOTO — UNCHANGED */}
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
                                        {saving
                                            ? "Saving..."
                                            : "Save changes"}
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </section>

                {/* ==========================================
                    MAIN CONTENT
                ========================================== */}

                <div className="mx-auto max-w-7xl px-6 pt-8 lg:px-8">
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

                    {/* ==========================================
                        STAT CARDS
                    ========================================== */}

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

                    {/* ==========================================
                        CONTENT GRID
                    ========================================== */}

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
                                        onClick={openAddressModal}
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
                                            Add your home, work, college or
                                            other delivery locations for a
                                            faster checkout.
                                        </p>

                                        <button
                                            type="button"
                                            onClick={openAddressModal}
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
                                                onEdit={openEditAddressModal}
                                                onDelete={handleDeleteAddress}
                                                deleting={deletingAddressId === address._id}
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
                                        onClick={() =>
                                            navigate("/reset-password")
                                        }
                                    />

                                    <AccountLink
                                        icon={ShoppingBag}
                                        title="Order history"
                                        description="View your previous orders"
                                        onClick={() =>
                                            navigate("/orders")
                                        }
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

                            <div className="rounded-3xl bg-gradient-to-br from-violet-600 to-fuchsia-600 p-6 text-white shadow-xl shadow-violet-600/20">
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md">
                                    <ShoppingBag size={21} />
                                </div>

                                <h3 className="mt-5 text-xl font-bold">
                                    Hungry already?
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-violet-100">
                                    Discover restaurants, explore new dishes
                                    and place your next order.
                                </p>

                                <Link
                                    to="/restaurants"
                                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-xs font-bold text-violet-700 transition hover:bg-violet-50"
                                >
                                    Explore restaurants
                                    <ChevronRight size={15} />
                                </Link>
                            </div>

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

            {/* ==========================================
                ADD ADDRESS MODAL
            ========================================== */}

            <AnimatePresence>
                {isAddressModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
                        onMouseDown={(e) => {
                            if (e.target === e.currentTarget) {
                                closeAddressModal();
                            }
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.97 }}
                            transition={{ duration: 0.2 }}
                            className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
                        >
                            {/* Modal header */}
                            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
                                <div>
                                    <h2 className="text-xl font-bold text-slate-950">
    {editingAddress ? "Edit address" : "Add new address"}
</h2>

                                    <p className="mt-1 text-xs text-slate-400">
                                        Save a delivery location for faster
                                        checkout.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={closeAddressModal}
                                    disabled={addressSaving}
                                    className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
                                    aria-label="Close"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Modal body */}
                            <form
                                onSubmit={handleSaveAddress}
                                className="p-6"
                            >
                                {/* Address label */}
                                <div>
                                    <label className="mb-2 block text-xs font-bold text-slate-700">
                                        Address type
                                    </label>

                                    <div className="grid grid-cols-3 gap-3">
                                        {["Home", "Work", "Other"].map(
                                            (label) => {
                                                const Icon =
                                                    label === "Home"
                                                        ? Home
                                                        : label === "Work"
                                                            ? Briefcase
                                                            : MapPin;

                                                const selected =
                                                    addressForm.label ===
                                                    label;

                                                return (
                                                    <button
                                                        key={label}
                                                        type="button"
                                                        onClick={() =>
                                                            setAddressForm(
                                                                (prev) => ({
                                                                    ...prev,
                                                                    label,
                                                                })
                                                            )
                                                        }
                                                        className={`flex items-center justify-center gap-2 rounded-2xl border px-3 py-3 text-xs font-bold transition ${selected
                                                                ? "border-violet-500 bg-violet-50 text-violet-700"
                                                                : "border-slate-200 bg-white text-slate-500 hover:border-violet-200 hover:bg-violet-50/50"
                                                            }`}
                                                    >
                                                        <Icon size={16} />
                                                        {label}
                                                    </button>
                                                );
                                            }
                                        )}
                                    </div>
                                </div>

                                {/* Address line */}
                                <div className="mt-5">
                                    <label
                                        htmlFor="addressLine"
                                        className="mb-2 block text-xs font-bold text-slate-700"
                                    >
                                        Address
                                    </label>

                                    <div className="relative">
                                        <MapPin
                                            size={16}
                                            className="absolute left-4 top-4 text-slate-400"
                                        />

                                        <textarea
                                            id="addressLine"
                                            name="addressLine"
                                            value={
                                                addressForm.addressLine
                                            }
                                            onChange={
                                                handleAddressChange
                                            }
                                            placeholder="House / flat / building, street"
                                            rows={3}
                                            required
                                            className="w-full resize-none rounded-2xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                                        />
                                    </div>
                                </div>

                                {/* City + State */}
                                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <label
                                            htmlFor="city"
                                            className="mb-2 block text-xs font-bold text-slate-700"
                                        >
                                            City
                                        </label>

                                        <input
                                            id="city"
                                            name="city"
                                            type="text"
                                            value={addressForm.city}
                                            onChange={
                                                handleAddressChange
                                            }
                                            placeholder="e.g. New Delhi"
                                            required
                                            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="state"
                                            className="mb-2 block text-xs font-bold text-slate-700"
                                        >
                                            State
                                        </label>

                                        <input
                                            id="state"
                                            name="state"
                                            type="text"
                                            value={addressForm.state}
                                            onChange={
                                                handleAddressChange
                                            }
                                            placeholder="e.g. Delhi"
                                            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                                        />
                                    </div>
                                </div>

                                {/* Pincode + Landmark */}
                                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <label
                                            htmlFor="pincode"
                                            className="mb-2 block text-xs font-bold text-slate-700"
                                        >
                                            Pincode
                                        </label>

                                        <input
                                            id="pincode"
                                            name="pincode"
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={6}
                                            value={
                                                addressForm.pincode
                                            }
                                            onChange={
                                                handleAddressChange
                                            }
                                            placeholder="6-digit pincode"
                                            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="landmark"
                                            className="mb-2 block text-xs font-bold text-slate-700"
                                        >
                                            Landmark
                                        </label>

                                        <input
                                            id="landmark"
                                            name="landmark"
                                            type="text"
                                            value={
                                                addressForm.landmark
                                            }
                                            onChange={
                                                handleAddressChange
                                            }
                                            placeholder="Nearby landmark"
                                            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                                        />
                                    </div>
                                </div>

                                {/* Error */}
                                {addressError && (
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            y: -5,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-semibold text-red-600"
                                    >
                                        {addressError}
                                    </motion.div>
                                )}

                                {/* Actions */}
                                <div className="mt-7 flex gap-3">
                                    <button
                                        type="button"
                                        onClick={closeAddressModal}
                                        disabled={addressSaving}
                                        className="flex-1 rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={addressSaving}
                                        className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-violet-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-600/20 transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-70"
                                    >
                                        {addressSaving ? (
                                            <>
                                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <Save size={17} />
                                                Save address
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

// ==========================================
// STAT CARD
// ==========================================

function StatCard({ icon: Icon, label, value, description }) {
    return (
        <div className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
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

// ==========================================
// PROFILE CARD
// ==========================================

function ProfileCard({
    title,
    description,
    icon: Icon,
    action,
    children,
}) {
    return (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                        <Icon size={18} />
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

// ==========================================
// PROFILE FIELD
// ==========================================

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
            <label className="mb-2 block text-xs font-bold text-slate-700">
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
                    className={`flex min-h-[50px] items-center gap-3 rounded-2xl border px-4 py-3 ${disabled
                            ? "border-slate-100 bg-slate-50"
                            : "border-slate-200 bg-white"
                        }`}
                >
                    <Icon size={16} className="shrink-0 text-slate-400" />

                    <span
                        className={`truncate text-sm ${value
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

// ==========================================
// ADDRESS CARD
// ==========================================

function AddressCard({
    address,
    onEdit,
    onDelete,
    deleting,
}) {
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

                <div className="flex items-center gap-1">
                    {/* EDIT */}
                    <button
                        type="button"
                        onClick={() => onEdit(address)}
                        disabled={deleting}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-violet-50 hover:text-violet-600 disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label={`Edit ${label} address`}
                    >
                        <Pencil size={15} />
                    </button>

                    {/* DELETE */}
                    <button
                        type="button"
                        onClick={() => onDelete(address)}
                        disabled={deleting}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label={`Delete ${label} address`}
                    >
                        {deleting ? (
                            <span className="block h-[15px] w-[15px] animate-spin rounded-full border-2 border-slate-200 border-t-red-500" />
                        ) : (
                            <X size={15} />
                        )}
                    </button>
                </div>
            </div>

            <p className="mt-4 text-xs leading-5 text-slate-500">
                {[
                    address.addressLine,
                    address.city,
                    address.state,
                    address.pincode,
                ]
                    .filter(Boolean)
                    .join(", ") || "Saved delivery address"}

                {address.landmark && (
                    <span className="mt-1 block text-slate-400">
                        Near {address.landmark}
                    </span>
                )}
            </p>
        </div>
    );
}


// ==========================================
// PREFERENCE ITEM
// ==========================================

function PreferenceItem({ title, description, icon: Icon }) {
    return (
        <button
            type="button"
            className="group flex w-full items-center gap-4 rounded-2xl border border-slate-200 p-4 text-left transition hover:border-violet-200 hover:bg-violet-50/40"
        >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-500 transition group-hover:bg-violet-100 group-hover:text-violet-600">
                <Icon size={17} />
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

// ==========================================
// ACCOUNT LINK
// ==========================================

function AccountLink({
    icon: Icon,
    title,
    description,
    onClick,
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="group flex w-full items-center gap-4 rounded-2xl p-3 text-left transition hover:bg-slate-50"
        >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-500 transition group-hover:bg-violet-100 group-hover:text-violet-600">
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

