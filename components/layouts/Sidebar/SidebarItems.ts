import { Code, ImageIcon, LayoutDashboard, MessageSquare, Music, Settings, VideoIcon } from "lucide-react";

export const SidebarItems = [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      href: '/dashboard',
      color: "text-sky-500"
    },
    {
      label: 'Conversation',
      icon: MessageSquare,
      href: '/conversation',
      color: "text-violet-500",
    },
    {
      label: 'Image Generation',
      icon: ImageIcon,
      color: "text-pink-700",
      href: '/image',
    },
    {
      label: 'Video Generation',
      icon: VideoIcon,
      color: "text-orange-700",
      href: '/video',
    },
    {
      label: 'Music Generation',
      icon: Music,
      color: "text-emerald-500",
      href: '/music',
    },
    {
      label: 'Code Generation',
      icon: Code,
      color: "text-green-700",
      href: '/code',
    },
  ];
  