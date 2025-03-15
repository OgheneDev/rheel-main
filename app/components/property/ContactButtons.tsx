import { Copy } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"

const ContactButtons = () => {
  return (
    <div className="flex items-center justify-center gap-5">
        <button className="flex gap-2 text-[12px] items-center bg-[#0A2F1E] text-white py-2 px-5 rounded-full">
            <FaWhatsapp size={15} />
            Make enquiries
        </button>
        <button className="flex gap-2 text-[12px] items-center bg-[#0A2F1E] text-white py-2 px-5 rounded-full">
            <Copy size={15} />
            Make enquiries
        </button>
    </div>
  )
}

export default ContactButtons