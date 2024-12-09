const BotMessage = require("../models/botMessage");
const User = require("../models/usersModels")

// Gửi tin nhắn và nhận phản hồi từ bot
const sendMessage = async (req, res) => {
    try {
        const { message, userId, sender } = req.body;

        if (!message || !userId || !sender) {
            return res.status(400).json({ error: "Tin nhắn, người gửi và ID người dùng là bắt buộc!" });
        }

        // Lưu tin nhắn của người dùng vào cơ sở dữ liệu
        const userMessage = await BotMessage.create({
            message,
            sender,
            userId,
        });

        // Tạo phản hồi tự động từ bot
        const botMessage = getBotResponse(message)
        const botResponse = await BotMessage.create({
            message: botMessage,
            sender: "bot",
            userId,
        });

        // Trả về cả tin nhắn của bot
        res.status(200).json({ userMessage, botMessage: botResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Đã xảy ra lỗi trong quá trình xử lý tin nhắn." });
    }
};


// Lấy lịch sử tin nhắn của người dùng
const getUserChatHistory = async (req, res) => {
    console.log('req ne:', req.params)
    try {
        const { userId } = req.params;
        console.log('userID ne: ', userId)

        if (!userId) {
            return res.status(400).json({ message: "ID người dùng là bắt buộc!" });
        }

        const messages = await BotMessage.find({ userId })
            .sort({ timestamp: 1 }) // Sắp xếp tin nhắn theo thời gian gửi
            .populate("userId", "user_name user_email"); // Lấy thông tin người dùng

        if (!messages.length) {
            return res.status(404).json({ message: "Không có tin nhắn trong lịch sử." });
        }

        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Đã xảy ra lỗi khi lấy lịch sử tin nhắn." });
    }
};

// Giả lập phản hồi từ bot (có thể kết nối API bot thực tế ở đây)
const getBotResponse = (message) => {
    const lowerCaseMessage = message.toLowerCase();

    // Phân loại câu hỏi và trả lời theo ngữ cảnh
    if (lowerCaseMessage.includes("chào") || lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("hi") || lowerCaseMessage.includes("helo")) {
        return "Chào bạn! Chúng tôi có thể giúp gì cho bạn hôm nay? Bạn có thể hỏi về sản phẩm, thanh toán hoặc giao hàng!";
    } else if (lowerCaseMessage.includes("bút") || lowerCaseMessage.includes("sổ tay")) {
        return "Chúng tôi có rất nhiều loại bút và sổ tay! Bạn có thể xem qua danh mục sản phẩm hoặc cho tôi biết loại bạn cần.";
    } else if (lowerCaseMessage.includes("giấy in") || lowerCaseMessage.includes("a4")) {
        return "Hiện tại chúng tôi có giấy in A4 chất lượng cao, giá tốt. Bạn muốn đặt số lượng bao nhiêu?";
    } else if (lowerCaseMessage.includes("giao hàng")) {
        return "Chúng tôi giao hàng toàn quốc trong 2-5 ngày làm việc. Miễn phí vận chuyển cho đơn hàng trên 500,000đ!";
    } else if (lowerCaseMessage.includes("thanh toán") || lowerCaseMessage.includes("thẻ")) {
        return "Bạn có thể thanh toán qua thẻ tín dụng, chuyển khoản ngân hàng, hoặc thanh toán khi nhận hàng.";
    } else if (lowerCaseMessage.includes("đổi trả") || lowerCaseMessage.includes("hoàn tiền")) {
        return "Chúng tôi hỗ trợ đổi trả trong vòng 7 ngày nếu sản phẩm bị lỗi hoặc không đúng mô tả. Bạn cần hỗ trợ gì cụ thể không?";
    } else if (lowerCaseMessage.includes("khuyến mãi") || lowerCaseMessage.includes("giảm giá")) {
        return "Hiện tại chúng tôi có chương trình giảm giá 10% cho đơn hàng đầu tiên! Hãy nhập mã 'WELCOME10' khi thanh toán nhé.";
    } else if (lowerCaseMessage.includes("giỏ hàng") || lowerCaseMessage.includes("đơn hàng")) {
        return "Để kiểm tra giỏ hàng, hãy vào biểu tượng giỏ hàng ở góc trên bên phải. Bạn cần hỗ trợ gì thêm không?";
    } else if (lowerCaseMessage.includes("hỗ trợ") || lowerCaseMessage.includes("tư vấn") || lowerCaseMessage.includes("giúp")) {
        return "Tôi ở đây để hỗ trợ bạn. Bạn cần tư vấn về sản phẩm hoặc dịch vụ nào? Hãy nói rõ hơn về vấn đề của bạn.";
    } else if (lowerCaseMessage.includes("bạn là ai") || lowerCaseMessage.includes("bot")) {
        return "Tôi là một bot, được lập trình để hỗ trợ bạn. Có gì cần hỏi không?";
    } else if (lowerCaseMessage.includes("cảm ơn")) {
        return "Không có gì! Rất vui khi được giúp bạn.";
    } else if (lowerCaseMessage.includes("tạm biệt") || lowerCaseMessage.includes("bye")) {
        return "Tạm biệt! Chúc bạn một ngày tốt lành.";
    } else {
        return "Xin lỗi, tôi chưa hiểu ý bạn. Bạn có thể nói rõ hơn không?";
    }
};

module.exports = {
    sendMessage,
    getUserChatHistory,
};
