
import { useEffect, useState } from "react";

type LoginProps = {
    onLoginSuccess: () => void;
};

export default function Login({ onLoginSuccess }: LoginProps) {
    const [loginId, setLoginId] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    useEffect(() => {
        const id = "exampleId";
        const password = "12345678";

        let cancelled = false;
        const timers = new Set<ReturnType<typeof setTimeout>>();

        const wait = (ms: number) =>
            new Promise<void>((resolve) => {
                const timer = setTimeout(() => {
                    timers.delete(timer);
                    resolve();
                }, ms);
                timers.add(timer);
            });

        const startAutoLogin = async () => {
            await wait(400);

            for (let i = 1; i <= id.length; i++) {
                if (cancelled) return;
                setLoginId(id.slice(0, i));
                await wait(90);
            }

            await wait(250);

            for (let i = 1; i <= password.length; i++) {
                if (cancelled) return;
                setLoginPassword(password.slice(0, i));
                await wait(90);
            }

            await wait(350);

            if (cancelled) return;
            setIsLoggingIn(true);

            await wait(2000);

            if (cancelled) return;
            onLoginSuccess();
        };

        void startAutoLogin();

        return () => {
            cancelled = true;
            timers.forEach(clearTimeout);
        };
    }, [onLoginSuccess]);

    return (
        <div className="mx-auto flex min-h-[calc(100vh-200px)] max-w-xl items-center justify-center">
            <div className="w-full max-w-sm rounded-xl p-8">
                <h1 className="mb-2 text-center text-2xl font-extrabold">
                    로그인
                </h1>

                <p className="mb-8 text-center text-sm text-gray-500">
                    로그인 과정을 진행하고 있습니다.
                </p>

                <label htmlFor="login-id" className="mb-2 block font-bold">
                    아이디
                </label>
                <input
                    id="login-id"
                    type="text"
                    value={loginId}
                    readOnly
                    className="mb-5 h-12 w-full border border-gray-300 bg-gray-50 px-4 text-base"
                />

                <label htmlFor="login-password" className="mb-2 block font-bold">
                    비밀번호
                </label>
                <input
                    id="login-password"
                    type="password"
                    value={loginPassword}
                    readOnly
                    className="mb-8 h-12 w-full border border-gray-300 bg-gray-50 px-4 text-base"
                />
                <div className="flex gap-1">
                <button
                    type="button"
                    disabled
                    className="h-14 w-full rounded-2xl bg-disabled-light text-xl"
                >
                    회원가입
                </button>
                <button
                    type="button"
                    disabled
                    className="h-14 w-full rounded-2xl bg-primary text-xl text-white"
                >
                    로그인
                </button>
                </div>
            </div>

            {isLoggingIn && (
                <div
                    role="status"
                    aria-live="polite"
                    className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40 px-4"
                >
                    <div className="flex w-full max-w-xs flex-col items-center gap-4 rounded-xl bg-white p-8 shadow-2xl">
                        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-primary" />
                        <p className="text-xl font-bold">로그인 중...</p>
                        <p className="text-sm text-gray-500">
                            예시 화면입니다. 실제 로그인 X
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

