import { NextResponse } from 'next/server'

const DOCTOR_PROMPT = `Ты медицинский ассистент Healthy Future. Отвечай вежливо на русском, учитывая историю диалога. НИКОГДА не ставь диагнозы. Всегда рекомендуй обратиться к врачу. При опасных симптомах направляй в скорую.`

const API_KEY = process.env.OPENROUTER_API_KEY

const localResponses: Record<string, string> = {
  болит: "Опишите, где именно болит, характер боли (острая, тупая), и как долго длится.",
  температура: "Пейте больше жидкости, постельный режим. Скорую если: выше 39.5°C, судороги, спутанность.",
  кашель: "Теплые напитки, влажный воздух. К врачу если: кровь, более 2 недель, сильное затруднение дыхания.",
  голова: "Тихое помещение, холодный компресс. Скорую если: громовая боль, потеря сознания, онемение.",
  тошнит: "Небольшие глотки воды, легкая пища. Скорую если: кровь в рвоте, обезвоживание.",
  бессонница: "Без гаджетов за час до сна, теплый душ, одинаковое время сна.",
  стресс: "Дыхание 4-7-8, прогулки, ограничьте кофеин. При постоянной тревоге — к психотерапевту.",
  усталость: "Проверьте железо и витамин D, сон 7-8 часов, умеренная активность."
}

function getLocalResponse(msg: string): string {
  const text = msg.toLowerCase()
  for (const [key, response] of Object.entries(localResponses)) {
    if (text.includes(key)) return response
  }
  return "Расскажите подробнее о симптомах: когда началось, есть ли другие проявления?"
}

export async function POST(request: Request) {
  try {
    const { message, chatHistory = [] } = await request.json()
    if (!message) return NextResponse.json({ error: 'Нет сообщения' }, { status: 400 })

    if (!API_KEY) {
      console.log('Нет API ключа, локальный режим')
      return NextResponse.json({ message: getLocalResponse(message), isAI: false, model: 'Локальный' })
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        'X-Title': 'Healthy Future'
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini',
        messages: [
          { role: 'system', content: DOCTOR_PROMPT },
          ...chatHistory,
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 600
      })
    })

    const text = await response.text()
    if (!response.ok || !text) throw new Error(`HTTP ${response.status}`)

    const data = JSON.parse(text)
    if (!data.choices?.[0]?.message?.content) throw new Error('Неверный ответ')

    return NextResponse.json({
      message: data.choices[0].message.content,
      isAI: true,
      model: data.model || 'GPT-4o Mini'
    })

  } catch (err) {
    console.error('Ошибка:', err)
    const { message = '' } = await request.json().catch(() => ({}))
    return NextResponse.json({
      message: getLocalResponse(message),
      isAI: false,
      model: 'Локальный (ошибка)'
    })
  }
}