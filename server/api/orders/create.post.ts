import * as nodemailer from 'nodemailer'
import type { OrderData, OrderItem } from '~~/shared/types'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const config = useRuntimeConfig()
    console.log('config', config)
    // Генерация ID заказа
    const orderId = `ORDER-${Date.now()}`
    const orderDate = new Date().toLocaleString('ru-RU')

    const orderData = {
        ...body,
        orderId,
        orderDate
    }

    try {
        // 1. Отправка в Email
        // await sendEmailNotification(orderData)

        // 2. Отправка в Telegram
        await sendTelegramNotification(orderData)

        return {
            success: true,
            orderId,
            message: 'Заказ успешно оформлен'
        }
    } catch (error) {
        console.error('Ошибка при обработке заказа:', error)
        return {
            success: false,
            message: 'Ошибка при оформлении заказа'
        }
    }
})

// Функция отправки Email
async function sendEmailNotification(order: OrderData) {
    const config = useRuntimeConfig()
    console.log('config', config)
    // Настройка транспорта (например, Gmail или Yandex)
    const transporter = nodemailer.createTransport({
        host: config.emailHost || 'smtp.gmail.com',
        port: config.emailPort || 587,
        secure: false,
        auth: {
            user: config.emailUser,
            pass: config.emailPassword
        }
    })

    const itemsList = order.items
        .map((item: OrderItem) =>
            `${item.productName} x${item.quantity} - ${item.price * item.quantity} ₽`
        )
        .join('\n')

    const mailOptions = {
        from: config.emailUser,
        to: config.emailRecipient || 'orders@candleshop.ru',
        subject: `Новый заказ #${order.orderId}`,
        text: `
Новый заказ от ${order.name}

Контактные данные:
Email: ${order.email}
Телефон: ${order.phone}
Адрес: ${order.address}
Комментарий: ${order.comment || 'Нет'}

Товары:
${itemsList}

Итого: ${order.total} ₽

Дата заказа: ${order.orderDate}
    `
    }

    await transporter.sendMail(mailOptions)
}

// Функция отправки в Telegram
async function sendTelegramNotification(order: OrderData) {
    const config = useRuntimeConfig()
    const botToken = config.telegramBotToken
    const chatId = config.telegramChatId

    if (!botToken || !chatId) {
        console.warn('Telegram credentials not configured')
        return
    }

    const itemsList = order.items
        .map((item: OrderItem) =>
            `• ${item.productName} x${item.quantity} - ${item.price * item.quantity} ₽`
        )
        .join('\n')

    const message = `
🕯️ *Новый заказ #${order.orderId}*

👤 *Клиент:* ${order.name}
📧 *Email:* ${order.email}
📱 *Телефон:* ${order.phone}
📍 *Адрес:* ${order.address}
💬 *Комментарий:* ${order.comment || 'Нет'}

📦 *Товары:*
${itemsList}

💰 *Итого:* ${order.total} ₽

🕐 *Дата:* ${order.orderDate}
  `

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`

    await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: 'Markdown'
        })
    })
}
