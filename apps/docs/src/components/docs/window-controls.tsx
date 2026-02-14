"use client"

import * as React from "react"

type PlatformKind = "mac" | "windows" | "linux" | "other"

export function WindowControls() {
  const [platform, setPlatform] = React.useState<PlatformKind>("other")

  React.useEffect(() => {
    const value = typeof navigator !== "undefined" ? navigator.userAgent.toLowerCase() : ""
    if (value.includes("mac")) {
      setPlatform("mac")
      return
    }
    if (value.includes("win")) {
      setPlatform("windows")
      return
    }
    if (value.includes("linux")) {
      setPlatform("linux")
      return
    }
    setPlatform("other")
  }, [])

  if (platform === "mac") {
    return (
      <div className="flex items-center gap-1.5">
        <span className="size-2.5 rounded-full bg-rose-400/70 shadow-[0_0_8px_rgb(251_113_133_/_0.28)]" />
        <span className="size-2.5 rounded-full bg-amber-400/70 shadow-[0_0_8px_rgb(251_191_36_/_0.28)]" />
        <span className="size-2.5 rounded-full bg-emerald-400/70 shadow-[0_0_8px_rgb(74_222_128_/_0.28)]" />
      </div>
    )
  }

  return (
    <div className="flex items-center gap-1.5">
      <span className="h-2 w-2 rounded-[3px] bg-white/35" />
      <span className="h-2 w-2 rounded-[3px] bg-white/25" />
      <span className="h-2 w-2 rounded-[3px] bg-white/20" />
    </div>
  )
}
