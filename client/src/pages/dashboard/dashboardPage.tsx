import { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../../components/sidebar";
import {
  IconActivity,
  IconHome,
  IconLoadBalancer,
  IconTimeline,
} from "@tabler/icons-react";

import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { Link } from "react-router-dom";

import { Outlet } from "react-router-dom";

import PageOneSection from "./pageOne";
import PageTwoSection from "./pageTwo";
import PageThreeSection from "./pageThree";

export function SidebarDemo() {
  const links = [
    {
      label: "Live Monitoring",
      href: "pageOne",
      icon: (
        <IconActivity className="text-neutral-700 dark:text-white h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "SoH Estimation",
      href: "pageTwo",
      icon: (
        <IconLoadBalancer className="text-neutral-700 dark:text-white h-5 w-5 flex-shrink-0" />
      ),
    },

    {
      label: "Future Prediction",
      href: "pageThree",
      icon: (
        <IconTimeline className="text-neutral-700 dark:text-white h-5 w-5 flex-shrink-0" />
      ),
    },

    {
      label: "Home",
      href: "/",
      icon: (
        <IconHome className="text-neutral-700 dark:text-white h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-blue-900 dark:bg-dark-black w-full flex-1  mx-auto border border-neutral-200 dark:border-blue-900 overflow-hidden",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen} animate={false}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
      <Outlet />
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      to="#"
      className="font-normal flex space-x-2 items-center text-sm text-white py-1 relative z-20"
    >
      <LogoIcon />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-white whitespace-pre"
      >
        Dashboard
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <h1 className="text-5xl md:text-2xl font-extrabold leading-tight tracking-tight">
      ⚡
    </h1>
  );
};

export const PageOne = () => {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-blue-900 dark:bg-black flex flex-col gap-2 flex-1 w-full h-full">
        <h1 className="text-2xl font-bold text-center">Real Time Monitoring</h1>
        <PageOneSection />
      </div>
    </div>
  );
};

export const PageTwo = () => {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-blue-900 dark:bg-black flex flex-col gap-2 flex-1 w-full h-full">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          Predict Battery SOH
        </h1>
        <PageTwoSection />
      </div>
    </div>
  );
};

export const PageThree = () => {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-blue-900 dark:bg-black flex flex-col gap-2 flex-1 w-full h-full">
        <h1 className="text-2xl font-bold text-center">
          SOH Future Prediction
        </h1>
        <PageThreeSection />
      </div>
    </div>
  );
};
