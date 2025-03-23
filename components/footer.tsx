import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail, Phone } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold text-teal-600 mb-4">AfyaGo</h3>
            <p className="text-gray-600 mb-4">
              Your trusted online pharmacy for all your medication needs. We provide quality healthcare products
              delivered to your doorstep.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-500 hover:text-teal-600">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-teal-600">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-teal-600">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-teal-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-600 hover:text-teal-600">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/prescriptions" className="text-gray-600 hover:text-teal-600">
                  Prescription Upload
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-teal-600">
                  Health Blog
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="text-gray-600 hover:text-teal-600">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/categories/prescription" className="text-gray-600 hover:text-teal-600">
                  Prescription Medications
                </Link>
              </li>
              <li>
                <Link href="/categories/otc" className="text-gray-600 hover:text-teal-600">
                  Over-the-Counter
                </Link>
              </li>
              <li>
                <Link href="/categories/vitamins" className="text-gray-600 hover:text-teal-600">
                  Vitamins & Supplements
                </Link>
              </li>
              <li>
                <Link href="/categories/personal-care" className="text-gray-600 hover:text-teal-600">
                  Personal Care
                </Link>
              </li>
              <li>
                <Link href="/categories/first-aid" className="text-gray-600 hover:text-teal-600">
                  First Aid
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-teal-600 mr-2 mt-0.5" />
                <span className="text-gray-600">+254 700 123 456</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-teal-600 mr-2 mt-0.5" />
                <span className="text-gray-600">support@afyago.com</span>
              </li>
              <li className="text-gray-600 mt-4">
                <p>123 Health Street</p>
                <p>Nairobi, Kenya</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-12 pt-8">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} AfyaGo All rights reserved.
          </p>
          <div className="flex justify-center space-x-6 mt-4">
            <Link href="/terms" className="text-sm text-gray-500 hover:text-teal-600">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-sm text-gray-500 hover:text-teal-600">
              Privacy Policy
            </Link>
            <Link href="/shipping" className="text-sm text-gray-500 hover:text-teal-600">
              Shipping Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

