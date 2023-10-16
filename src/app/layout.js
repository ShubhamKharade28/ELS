import './globals.css'

export const metadata = {
  title: 'Elective Enrollment',
  description: 'This is an app for students to enroll for elective-courses unambigously',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
