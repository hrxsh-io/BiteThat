const mongoose = require("mongoose");
const User = require("../models/User");

// ==========================================
// ADD ADDRESS
// POST /api/auth/addresses
// ==========================================

const addAddress = async (req, res) => {
  try {
    const {
      label,
      addressLine,
      city,
      state,
      pincode,
      landmark,
    } = req.body;

    // Required fields
    if (!addressLine || !city) {
      return res.status(400).json({
        success: false,
        message: "Address line and city are required",
      });
    }

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Add address
    user.addresses.push({
      label: label?.trim() || "Home",
      addressLine: addressLine.trim(),
      city: city.trim(),
      state: state?.trim() || "",
      pincode: pincode?.trim() || "",
      landmark: landmark?.trim() || "",
    });

    await user.save();

    // Get newly added address
    const newAddress =
      user.addresses[user.addresses.length - 1];

    return res.status(201).json({
      success: true,
      message: "Address added successfully",
      address: newAddress,
      addresses: user.addresses,
    });
  } catch (error) {
    console.error("Add address error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while adding address",
    });
  }
};

// ==========================================
// GET ADDRESSES
// GET /api/auth/addresses
// ==========================================

const getAddresses = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      addresses: user.addresses,
    });
  } catch (error) {
    console.error("Get addresses error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while fetching addresses",
    });
  }
};

// ==========================================
// UPDATE ADDRESS
// PATCH /api/auth/addresses/:addressId
// ==========================================

const updateAddress = async (req, res) => {
  try {
    const { addressId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(addressId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid address ID",
      });
    }

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const address = user.addresses.id(addressId);

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    const {
      label,
      addressLine,
      city,
      state,
      pincode,
      landmark,
    } = req.body;

    // Update only supplied fields
    if (label !== undefined) {
      address.label = label.trim();
    }

    if (addressLine !== undefined) {
      if (!addressLine.trim()) {
        return res.status(400).json({
          success: false,
          message: "Address line cannot be empty",
        });
      }

      address.addressLine = addressLine.trim();
    }

    if (city !== undefined) {
      if (!city.trim()) {
        return res.status(400).json({
          success: false,
          message: "City cannot be empty",
        });
      }

      address.city = city.trim();
    }

    if (state !== undefined) {
      address.state = state.trim();
    }

    if (pincode !== undefined) {
      address.pincode = pincode.trim();
    }

    if (landmark !== undefined) {
      address.landmark = landmark.trim();
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Address updated successfully",
      address,
      addresses: user.addresses,
    });
  } catch (error) {
    console.error("Update address error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while updating address",
    });
  }
};

// ==========================================
// DELETE ADDRESS
// DELETE /api/auth/addresses/:addressId
// ==========================================

const deleteAddress = async (req, res) => {
  try {
    const { addressId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(addressId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid address ID",
      });
    }

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const address = user.addresses.id(addressId);

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    address.deleteOne();

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Address deleted successfully",
      addresses: user.addresses,
    });
  } catch (error) {
    console.error("Delete address error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while deleting address",
    });
  }
};

module.exports = {
  addAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
};