export const designSystem = {
  colors: {
    primary: {
      gradient: "bg-gradient-to-r from-blue-600 to-blue-500",
      text: "text-blue-600",
      hover: "hover:bg-blue-700",
      light: "bg-blue-50",
      border: "border-blue-100",
      lightHover: "hover:bg-blue-50",
    },
    background: {
      gradient: "bg-gradient-to-b from-blue-50 via-white to-blue-50",
      card: "bg-white",
      overlay: "bg-white/80",
    },
    text: {
      primary: "text-gray-900",
      secondary: "text-gray-600",
      muted: "text-gray-500",
    },
  },
  effects: {
    blur: "backdrop-blur-sm",
    hover:
      "hover:shadow-md hover:border-blue-100 transition-all duration-300 hover:-translate-y-1",
    card: "rounded-xl border bg-white shadow-sm",
    cardHover: "hover:shadow-xl transition-all duration-300",
  },
  layout: {
    container: "container mx-auto px-4 sm:px-6 lg:px-8",
    section: "py-24",
    header: "sticky top-0 z-50",
  },
  dropdown: {
    content: {
      base: "w-56 p-0 border-none shadow-lg bg-white/80 backdrop-blur-sm",
      header: "px-3 py-2 border-b bg-white",
      inner: "p-1",
      item: {
        base: "flex items-center w-full px-2 py-1.5 rounded-md transition-colors duration-150",
        hover: "hover:bg-blue-50 hover:text-blue-600",
        selected: "bg-blue-50 text-blue-600",
        active: "bg-blue-50",
        danger: "text-red-600 hover:text-red-700 hover:bg-red-50",
        icon: "mr-2 h-4 w-4",
      },
      separator: "my-1",
    },
    text: {
      title: "font-medium text-gray-900",
      subtitle: "text-xs text-gray-500",
      item: "text-gray-700",
    },
  },
};
