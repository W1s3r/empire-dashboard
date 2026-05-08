// Legacy view is now the root route (/). This redirect keeps old links working.
import { redirect } from 'next/navigation'

export default function LegacyRedirect() {
  redirect('/')
}
