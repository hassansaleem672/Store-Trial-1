import { useTheme } from '../../context/ThemeContext'

export default function AnnouncementBar() {
  const { theme } = useTheme()
  const { announcementEnabled, announcementText, announcementBg, announcementText_color } = theme.header

  if (!announcementEnabled) return null

  return (
    <div
      style={{ backgroundColor: announcementBg, color: announcementText_color }}
      className="px-4 py-2 text-center text-xs font-medium tracking-wide sm:text-sm"
    >
      {announcementText}
    </div>
  )
}
