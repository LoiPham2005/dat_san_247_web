import { AxiosError } from 'axios';

export const handleApiError = (error: unknown): string => {
    if (error instanceof AxiosError) {
        // Lỗi mạng/Không kết nối được server
        if (error.code === 'ECONNREFUSED' || !error.response) {
            return 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng hoặc thử lại sau.';
        }

        const status = error.response.status;
        const data = error.response.data as any;
        const message = data?.message;

        switch (status) {
            case 400:
                if (Array.isArray(message)) {
                    return message.join(', ');
                }
                return message || 'Dữ liệu không hợp lệ.';
            case 401:
                if (message === 'Invalid credentials') {
                    return 'Email hoặc mật khẩu không chính xác.';
                }
                if (message === 'Account is disabled') {
                    return 'Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản trị viên.';
                }
                return message || 'Bạn không có quyền truy cập.';
            case 403:
                return 'Bạn không có quyền thực hiện hành động này.';
            case 404:
                return 'Không tìm thấy yêu cầu.';
            case 409:
                if (message === 'Email already exists') {
                    return 'Email này đã được sử dụng.';
                }
                return message || 'Dữ liệu đã tồn tại.';
            case 422:
                return 'Dữ liệu cung cấp không thể xử lý.';
            case 429:
                return 'Bạn đã thao tác quá nhanh. Vui lòng thử lại sau vài phút.';
            case 500:
                return 'Lỗi hệ thống từ máy chủ. Chúng tôi đang khắc phục.';
            default:
                return message || 'Đã có lỗi xảy ra. Vui lòng thử lại.';
        }
    }

    if (error instanceof Error) {
        const message = error.message;
        if (message === 'Invalid credentials' || message === 'CredentialsSignin') {
            return 'Email hoặc mật khẩu không chính xác.';
        }
        if (message === 'Account is disabled') {
            return 'Tài khoản của bạn đã bị khóa.';
        }
        if (message.includes('ECONNREFUSED') || message.includes('Network Error')) {
            return 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại backend.';
        }
        return message;
    }

    return 'Đã có lỗi không xác định xảy ra.';
};
