

import { UserRound } from "lucide-react";
import { useState, useRef, useLayoutEffect, useCallback } from "react";
import Login from "./pages/Login";
import Write from "./pages/Write";
import OrderDetail from "./pages/OrderDetail";
import type { Order } from "./types/order";

type Screen = "home" | "login" | "write" | "orderDetail";

function App() {

  const [createdOrder, setCreatedOrder] = useState<Order | null>(() => {
  try {
    const saved = sessionStorage.getItem("createdOrder");
    return saved ? (JSON.parse(saved) as Order) : null;
  } catch {
    return null;
  }
});


  const [screen, setScreen] = useState<Screen>("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mission, setMission] = useState<"login" | "write">("login");

  const menus = isLoggedIn
    ? ["검색", "주문조회", "홈", "글쓰기", "로그아웃"]
    : ["검색", "주문조회", "홈", "회원가입", "로그인"];

  const showMission = screen === "home";

  const missionRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLButtonElement>(null);

  const [arrow, setArrow] = useState<{
    startX: number;
    startY: number;
    endX: number;
    endY: number;
  } | null>(null);

  useLayoutEffect(() => {
    if (!showMission) return;

    const updateArrow = () => {
      if (!missionRef.current || !targetRef.current) return;

      const mission = missionRef.current.getBoundingClientRect();
      const target = targetRef.current.getBoundingClientRect();

      setArrow({
        startX: mission.right - 30,
        startY: mission.bottom,
        endX: target.left + target.width / 2,
        endY: target.top - 12,
      });
    };

    const frame = requestAnimationFrame(updateArrow);

    window.addEventListener("resize", updateArrow);
    window.addEventListener("scroll", updateArrow, true);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", updateArrow);
      window.removeEventListener("scroll", updateArrow, true);
    };
  }, [showMission, mission]);

  const handleMenuClick = (menu: string) => {
    if (menu === "로그인") {
      setScreen("login");
    }

    if (menu === "글쓰기") {
      setScreen("write");
    }

    if (menu === "홈") {
      setScreen("home");
    }

    if (menu === "로그아웃") {
      setIsLoggedIn(false);
      setMission("login");
      setScreen("home");
    }
  };

  const handleLoginSuccess = useCallback(() => {
    setIsLoggedIn(true);
    setMission("write");
    setScreen("home");
  }, []);

  const handleWriteComplete = (order: Order) => {
    sessionStorage.setItem("createdOrder", JSON.stringify(order));
    setCreatedOrder(order);
    setScreen("orderDetail");
  };

  return (
    <div className="min-h-screen bg-[#f7f9ff] text-[#171c22]">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full bg-[#f7f9ff]/90 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold tracking-tight text-[#006c48]">
              설명 웹 게임
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 rounded bg-[#eaeef6] px-2 py-1 text-xs font-bold">
              <span className="text-[#895100]">DAY 01</span>
              <span>09:00</span>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#006c48]">
              <UserRound size={18} className="text-white" />
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto w-full max-w-7xl px-4 pt-14 pb-32 sm:px-8">
        {screen === "home" && (
          <div className="relative flex w-full justify-center py-4 sm:py-6">
            <div className="pointer-events-none absolute -top-10 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-[#73fbbc]/20 blur-3xl" />

            <div
              className="flex min-h-[680px] w-full max-w-xl flex-col overflow-hidden rounded-xl border border-[#dee3eb] shadow-xl"
              style={{ minHeight: "calc(100vh - 200px)" }}
            >
              <div className="min-h-[340px] flex-1 bg-white" />
              <div className="h-1 w-full bg-primary" />
              <div className="min-h-[340px] flex-1 bg-[#e4e8f0]" />
            </div>
          </div>
        )}

        {screen === "login" && (
          <Login onLoginSuccess={handleLoginSuccess} />
        )}

        {screen === "write" && (
          <Write
            onCancel={() => setScreen("home")}
            onComplete={handleWriteComplete}
          />
        )}

        {screen === "orderDetail" && createdOrder && (
          <OrderDetail
            order={createdOrder}
            onBack={() => setScreen("home")}
          />
        )}
      </main>


      {/* Mission Popup */}
      {showMission && (
        <>
          {/* 어두운 배경 */}
          <div className="fixed inset-0 z-40 bg-black/40" />

          {/* 미션 안내창 */}
          <div className="pointer-events-none fixed inset-0 z-[60] flex items-center justify-center px-4 pb-28">
            <div
              ref={missionRef}
              role="dialog"
              aria-labelledby="mission-title"
              className="w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl"
            >
              {/* 제목 */}
              <h2
                id="mission-title"
                className="mb-3 text-xl font-extrabold"
              >
                {mission === "login"
                  ? "설명서 웹에 오신 것을 환영합니다"
                  : "로그인 완료!"}
              </h2>
              {/* 설명 */}
              <p className="mb-5 text-base">
                {mission === "login"
                  ? "아래의 로그인 버튼을 눌러주세요."
                  : "이제 주문서를 작성해 보세요. 아래의 글쓰기 버튼을 눌러주세요."}
              </p>
              {/* 목표 */}
              {/* - 확인 - 송장 입력 - 정산 익히기 */}
              <div className="text-disabled px-4 py-3 text-center font-bold">
                {mission === "login"
                  ? "목표: 로그인하기"
                  : "목표: 주문서 작성 "}
              </div>
            </div>
          </div>

          {/* 빨간 화살표 */}
          {arrow && (
            <svg
              className="pointer-events-none fixed inset-0 z-[60] h-full w-full"
              aria-hidden="true"
            >
              <defs>
                <marker
                  id="mission-arrowhead"
                  markerWidth="6"
                  markerHeight="6"
                  refX="5"
                  refY="3"
                  orient="auto"
                >
                  <path d="M 0 0 L 6 3 L 0 6 Z" fill="#dc2626" />
                </marker>
              </defs>

              <path
                d={`
            M ${arrow.startX} ${arrow.startY}
            C ${arrow.startX} ${arrow.startY + 90},
              ${arrow.endX} ${arrow.endY - 90},
              ${arrow.endX} ${arrow.endY}
          `}
                fill="none"
                stroke="#dc2626"
                strokeWidth="7"
                strokeLinecap="round"
                markerEnd="url(#mission-arrowhead)"
              />
            </svg>
          )}
        </>
      )}

      {/* Footer */}
      {screen === "home" && (
        <footer className="fixed right-0 bottom-0 left-0 z-50 bg-[#f7f9ff]/95 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] backdrop-blur-xl">
          <nav className="mx-auto flex max-w-xl items-center justify-between px-4 py-4">
            {menus.map((menu) => {
              const isTarget =
                showMission &&
                ((mission === "login" && menu === "로그인") ||
                  (mission === "write" && menu === "글쓰기"));

              return (
                <button
                  key={menu}
                  ref={isTarget ? targetRef : null}
                  type="button"
                  onClick={() => handleMenuClick(menu)}
                  className={`
              relative flex h-20 flex-1 items-center justify-center
              border text-center text-xl font-extrabold shadow-md
              sm:text-2xl
              ${isTarget
                      ? "z-[70] border-red-600 bg-white ring-4 ring-red-600"
                      : "border-[#dee3eb] bg-[#e4e8f0]"
                    }
            `}
                >
                  {menu}
                </button>
              );
            })}
          </nav>
        </footer>
      )}


    </div>
  );
}

export default App;
