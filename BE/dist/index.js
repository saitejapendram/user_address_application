"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 3005;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
mongoose_1.default.connect(process.env.DATABASE_URL)
    .then(() => {
    app.listen(PORT, () => {
        console.log(`server listening on port ${PORT}`);
    });
    console.log("DB connected");
});
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: 5,
        MaxLength: 20,
        trim: true
    },
    firstName: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 20,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 20,
        trim: true
    }
});
const addressSchema = new mongoose_1.default.Schema({
    houseNumber: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User"
    },
    pincode: {
        type: Number,
        required: true
    },
    colony: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        requried: true
    },
    state: {
        type: String,
        requried: true
    },
    country: {
        type: String,
        required: true
    }
});
const User = mongoose_1.default.model("User", userSchema);
const Address = mongoose_1.default.model("Address", addressSchema);
app.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, firstName, lastName } = req.body;
    const isUser = yield User.findOne({ email });
    if (isUser) {
        return res.status(404).json({ message: "user already existed" });
    }
    const user = yield User.create({
        email: email,
        firstName: firstName,
        lastName: lastName
    });
    res.status(200).json({
        message: "success",
        userId: user._id
    });
}));
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const isUser = yield User.findOne({ email: email });
    if (!isUser) {
        return res.status(404).json({ message: "invalid user" });
    }
    res.status(200).json({
        message: "success",
        userId: isUser._id
    });
}));
app.post("/address", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { houseNumber, pincode, colony, city, state, country, userId } = req.body;
    const isUser = yield User.findOne({ _id: userId });
    if (!isUser) {
        return res.status(404).json({ message: "Invalid user" });
    }
    const address = yield Address.create({
        userId,
        houseNumber,
        pincode,
        city,
        state,
        colony,
        country
    });
    res.status(200).json({
        message: "success",
        address: address
    });
}));
