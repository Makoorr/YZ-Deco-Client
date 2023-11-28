import Providers from "@modules/providers"
import "styles/globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <main className="bg-stone-100 relative">{children}</main> {/* bg-gradient-to-l from-pink-300 to-orange-200 */}
        </Providers>
      </body>
    </html>
  )
}
