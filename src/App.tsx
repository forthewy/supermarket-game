
import { useState } from 'react'

const products = [
  { id: 1, name: '유기농 우유', price: 3500 },
  { id: 2, name: '바게트빵', price: 4500 },
]

function App() {
  const [quantities, setQuantities] = useState<Record<number, number>>({
    1: 1,
    2: 1,
  })
  const [completed, setCompleted] = useState(false)
  const [message, setMessage] = useState('')

  const changeQuantity = (id: number, amount: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(0, prev[id] + amount),
    }))
    setMessage('')
  }

  const handleConfirm = () => {
    if (quantities[1] === 3) {
      setCompleted(true)
    } else {
      setMessage('우유 수량을 3개로 맞춰주세요!')
    }
  }

  const restart = () => {
    setQuantities({ 1: 1, 2: 1 })
    setCompleted(false)
    setMessage('')
  }

  return (
    <main className="min-h-screen bg-emerald-50 p-6">
      <div className="mx-auto max-w-xl">
        <h1 className="text-3xl font-bold text-emerald-800">
          슈퍼마켓 게임
        </h1>
        <p className="mt-2 text-gray-600">
          첫 번째 미션: 상품 수량 변경
        </p>

        <div className="mt-8 rounded-2xl bg-white p-6 shadow-md">
          {completed ? (
            <div className="py-8 text-center">
              <h2 className="text-2xl font-bold text-emerald-700">
                미션 완료!
              </h2>
              <p className="mt-3">우유 3개를 준비했어요.</p>
              <button
                onClick={restart}
                className="mt-6 rounded-xl bg-emerald-600 px-6 py-3 text-white"
              >
                다시 시작하기
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold">
                우유를 3개로 변경하세요!
              </h2>

              <div className="mt-6 space-y-4">
                {products.map(product => (
                  <div
                    key={product.id}
                    className="rounded-xl border border-gray-200 p-4"
                  >
                    <div className="font-semibold">
                      {product.name}
                    </div>
                    <p className="text-sm text-gray-500">
                      {product.price.toLocaleString()}원
                    </p>

                    <div className="mt-4 flex items-center gap-4">
                      <button
                        onClick={() => changeQuantity(product.id, -1)}
                        className="rounded-lg bg-gray-200 px-4 py-2"
                      >
                        -
                      </button>
                      <span className="font-bold">
                        {quantities[product.id]}개
                      </span>
                      <button
                        onClick={() => changeQuantity(product.id, 1)}
                        className="rounded-lg bg-emerald-200 px-4 py-2"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-right font-bold">
                총 금액:{' '}
                {products.reduce(
                  (sum, p) => sum + p.price * quantities[p.id],
                  0
                ).toLocaleString()}원
              </p>

              {message && (
                <p className="mt-4 text-center text-red-600">
                  {message}
                </p>
              )}

              <button
                onClick={handleConfirm}
                className="mt-6 w-full rounded-xl bg-emerald-600 py-4 font-bold text-white hover:bg-emerald-700"
              >
                확인
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  )
}

export default App
