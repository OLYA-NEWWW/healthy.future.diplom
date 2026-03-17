import { NextResponse } from 'next/server'
const API_KEY = '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'

const DOCTOR_PROMPT = `Ты медицинский ассистент в приложении Healthy Future. 
Ты видишь ВСЮ историю диалога выше. Отвечай вежливо на русском, учитывая контекст.

ПРАВИЛА:
1. Анализируй ВСЕ предыдущие сообщения чтобы понять контекст
2. Если пользователь уточняет симптомы — связывай с тем, что было раньше
3. НИКОГДА не ставь диагнозы
4. Всегда говори: "Это общая информация, обратитесь к врачу"
5. При опасных симптомах направляй в скорую
6. Будь поддерживающим и понятным

Пример хорошего диалога с памятью:
Пользователь: "Болит живот"
Ты: "Понимаю, боль в животе может быть связана с разными причинами..."
Пользователь: "И тошнит"
Ты: "Боль в животе с тошнотой может указывать на проблемы с пищеварением. Рекомендую обратиться к гастроэнтерологу."`

export async function POST(request: Request) {
  try {
    const { message, chatHistory = [] } = await request.json()

    const messages = [
      { role: 'system', content: DOCTOR_PROMPT },
      ...chatHistory, 
      { role: 'user', content: message }
    ]
    
    if (!API_KEY || API_KEY.includes('ваш_ключ')) {
      return await getUniversalResponse(message, chatHistory)
    }
 
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://healthyfuture.com',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: messages,
        temperature: 0.7,
        max_tokens: 600
      })
    })
    
    if (!response.ok) throw new Error('API error')
    
    const data = await response.json()
    const aiResponse = data.choices[0]?.message?.content || 'Извините, не могу сейчас ответить'
    
    return NextResponse.json({ 
      success: true, 
      message: aiResponse,
      isAI: true,
      model: 'GPT-3.5 Turbo'
    })
    
  } catch (error) {
    console.error('AI Error:', error)
    return await getUniversalResponse('', [])
  }
}

async function getUniversalResponse(userMessage: string, chatHistory: any[]) {
  await new Promise(resolve => setTimeout(resolve, 800))
  
  let response = ""
  if (chatHistory.length > 0) {
    const lastSymptoms = chatHistory
      .filter((m: any) => m.role === 'user')
      .slice(-2)
      .map((m: any) => m.content)
      .join(' ')
      .toLowerCase()
  
    response = `Спасибо за уточнение. Учитывая ваши предыдущие симптомы (${lastSymptoms.slice(0, 50)}...), могу сказать: важно наблюдать за своим состоянием. Если симптомы сохраняются или усиливаются — обязательно обратитесь к врачу для осмотра.`
  } 
  else {
    const msg = userMessage.toLowerCase()
    
    if (msg.includes('болит') || msg.includes('боль') || msg.includes('колет')) {
      response = "Понимаю, что вас беспокоит боль. Опишите, где именно болит, какой характер боли (острая, тупая, ноющая), и как долго это продолжается. Это поможет лучше понять ситуацию."
    }
    else if (msg.includes('температур') || msg.includes('жар') || msg.includes('лихорад')) {
      response = "🌡️ **Повышенная температура**\n\nРекомендации:\n• Пить больше жидкости\n• Постельный режим\n• Измерять температуру каждые 3-4 часа\n\n⚠️ Скорую если: выше 39.5°C, судороги, спутанность сознания"
    }
    else if (msg.includes('тошнит') || msg.includes('рвота') || msg.includes('диарея')) {
      response = "Проблемы с пищеварением могут быть вызваны разными причинами. Важно пить достаточно жидкости, есть легкую пищу. Если симптомы сильные или длительные — обратитесь к гастроэнтерологу."
    }
    else {
      response = "Спасибо за ваш вопрос. Как медицинский помощник, я рекомендую обратиться к врачу для точной диагностики. Расскажите подробнее о симптомах?"
    }
  }
  
  return NextResponse.json({ 
    success: true, 
    message: response,
    isAI: false,
    model: 'Демо-помощник'
  })
}