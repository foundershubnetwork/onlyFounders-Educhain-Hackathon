"use client"

import { useRef } from "react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { commonConfig } from "@/config/common"
import { buildFoundersPersonalityTraitsSurveyRequest } from "@/features/survey-request/utils"
import { buildVeridaRequestUrl } from "@/features/verida-request/utils"

const surveryRequest = buildFoundersPersonalityTraitsSurveyRequest()
const veridaRequestUrl = buildVeridaRequestUrl(
  surveryRequest,
  commonConfig.VERIDA_VAULT_BASE_URL
)
export default function ModernButton() {
  const buttonRef = useRef<HTMLButtonElement>(null)

  return (
<>
      <div className="relative inline-block">
        {/* Button with lightning border effect */}
        <button
          ref={buttonRef}
          className="
            relative
            bg-[#0a2a30] 
            hover:bg-[#0a3540] 
            text-[#00e1ff] 
            font-medium 
            text-xl 
            px-10 
            py-4 
            rounded-[16px]
            transition-all
            duration-300
            flex 
            items-center 
            gap-2
            z-10
            lightning-border
            group
          "
          onClick={() =>{window.open(veridaRequestUrl.toString(), "_blank");}}
        >
          <span>Start Quest Now</span>
          <ArrowRight className="h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>

      {/* Add custom animations */}
      <style jsx global>{`
        /* Lightning border effect */
        .lightning-border {
          position: relative;
          border: 1px solid rgba(0, 225, 255, 0.5);
          box-shadow: 0 0 5px rgba(0, 225, 255, 0.3);
        }
        
        .lightning-border::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          border-radius: 18px;
          background: linear-gradient(90deg, 
            transparent 0%, 
            transparent 25%, 
            #00e1ff 49%, 
            #ffffff 50%, 
            #00e1ff 51%, 
            transparent 75%, 
            transparent 100%
          );
          background-size: 200% 100%;
          animation: lightning-move 3s linear infinite;
          z-index: -1;
          opacity: 0.8;
        }
        
        .lightning-border::after {
          content: '';
          position: absolute;
          top: -1px;
          left: -1px;
          right: -1px;
          bottom: -1px;
          border-radius: 17px;
          background: #0a2a30;
          z-index: -1;
        }
        
        @keyframes lightning-move {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: 0% 0;
          }
        }
      `}</style>
</>
  )
}

