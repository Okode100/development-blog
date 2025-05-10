import Container from "@/components/container";
import ThemeSwitch from "@/components/themeSwitch";
import Image from "next/image";
import { myLoader } from "@/utils/all";
import VercelLogo from "../public/img/vercel.svg";
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";

export default function Footer(props) {
  return (
    <Container className="mt-10 border-t border-gray-100 dark:border-gray-800">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-8">
        {/* Left Panel: Social Links */}
        <div className="flex flex-col items-start space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Follow Us</h3>
          <table className="text-sm text-gray-600 dark:text-gray-400">
            <tbody className="space-y-6">
              <tr className="h-8">
                <td className="pr-4 flex items-center">
                  <FaTwitter className="mr-2 text-blue-500 text-xl" /> Twitter:
                </td>
                <td>
                  <a href="https://twitter.com" target="_blank" rel="noopener" className="hover:underline hover:text-blue-500 transition-colors">
                    @buddingafrica
                  </a>
                </td>
              </tr>
              <tr className="h-8">
                <td className="pr-4 flex items-center">
                  <FaFacebook className="mr-2 text-blue-700 text-xl" /> Facebook:
                </td>
                <td>
                  <a href="https://facebook.com" target="_blank" rel="noopener" className="hover:underline hover:text-blue-500 transition-colors">
                    Budding Africa
                  </a>
                </td>
              </tr>
              <tr className="h-8">
                <td className="pr-4 flex items-center">
                  <FaInstagram className="mr-2 text-pink-500 text-xl" /> Instagram:
                </td>
                <td>
                  <a href="https://instagram.com" target="_blank" rel="noopener" className="hover:underline hover:text-blue-500 transition-colors">
                    @buddingafrica
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Center Panel: Copyright and Links */}
        <div className="flex flex-col items-center justify-center space-y-6 col-span-2">
          <table className="text-sm text-gray-600 dark:text-gray-400 w-full max-w-md">
            <tbody className="space-y-4">
              <tr className="text-center">
                <td colSpan="2" className="pb-4">
                  Copyright © {new Date().getFullYear()} {props?.copyright} All rights reserved.
                </td>
              </tr>
              <tr className="text-center">
                <td className="pb-4">
                  Made by Moses Okode
                </td>
                <td>
                  <a
                    href="https://github.com/Okode100"
                    rel="Okode100.github.io"
                    target="_blank"
                    className="hover:underline hover:text-blue-500 transition-colors space-2">
                    Github
                  </a>
                </td>
              </tr>
              <tr>
                <td className="text-center">
                  <a
                    href="https://vercel.com/?utm_source=web3templates&utm_campaign=oss"
                    target="_blank"
                    rel="noopener"
                    className="inline-block">
                    <Image
                      src={VercelLogo}
                      alt="Powered by Vercel"
                      unoptimized={true}
                      width="150"
                      height="25"
                    />
                  </a>
                </td>
                <td className="text-right">
                  <ThemeSwitch />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
}
