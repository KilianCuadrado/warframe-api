// Funciones de formato reutilizables en todas las vistas y componentes
export const CDN_IMAGE_URL = 'https://cdn.warframestat.us/img/'

export function useFormatters() {
    // Devuelve la url completa de una imagen de la CDN de warframestat
    const getImageUrl = (imageName) => imageName ? `${CDN_IMAGE_URL}${imageName}` : ''

    // Redondea un numero a X decimales (por defecto 2). Si no hay valor devuelve '-'
    const formatDecimal = (value, decimals = 2) => {
        if (value === null || value === undefined || Number.isNaN(Number(value))) return '-'
        return Number(value).toFixed(decimals)
    }

    // Muestra un porcentaje redondeado (la API ya lo da en %: 13.333 -> 13.33%)
    const formatPercent = (value, decimals = 2) => {
        const formatted = formatDecimal(value, decimals)
        return formatted === '-' ? formatted : `${formatted}%`
    }

    // Formatea una fecha ISO a formato legible en castellano
    const formatDateTime = (value) => {
        if (!value) return '-'

        const parsed = new Date(value)
        if (Number.isNaN(parsed.getTime())) return value

        return new Intl.DateTimeFormat('es-ES', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(parsed)
    }

    // Une un array de tags en un solo string
    const formatTags = (tags, separator = ' // ') => Array.isArray(tags) ? tags.join(separator) : ''

    return { getImageUrl, formatDecimal, formatPercent, formatDateTime, formatTags }
}
