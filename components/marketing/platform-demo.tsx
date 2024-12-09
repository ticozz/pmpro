'use client';

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  BarChart3,
  Home,
  Users,
  Bell,
  CheckCircle2,
  DollarSign,
} from "lucide-react";

const notifications = [
  {
    icon: <DollarSign className="w-4 h-4" />,
    text: "New payment received",
    subtext: "Rent payment - Unit 204",
  },
  {
    icon: <CheckCircle2 className="w-4 h-4" />,
    text: "Maintenance completed",
    subtext: "HVAC repair - Unit 107",
  },
  {
    icon: <Users className="w-4 h-4" />,
    text: "New tenant application",
    subtext: "For Unit 305",
  },
];

export function PlatformDemo() {
  return (
    <div className="relative mt-16 md:mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border bg-white/50 backdrop-blur-xl shadow-xl overflow-hidden hover:shadow-2xl hover:border-blue-100 transition-all duration-300"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-white/50">
          <div className="flex items-center space-x-4">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center"
            >
              <Home className="w-4 h-4 text-white" />
            </motion.div>
            <div>
              <h3 className="font-semibold">Sunset Apartments</h3>
              <p className="text-sm text-gray-500">24 units • 92% occupied</p>
            </div>
          </div>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 15, -15, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 5
            }}
          >
            <Bell className="w-5 h-5 text-blue-600" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-4 p-4">
          {/* Stats */}
          <div className="space-y-4">
            <motion.div
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="p-4">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Monthly Revenue</h4>
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "80%" }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    repeatDelay: 5
                  }}
                  className="h-8 bg-blue-600/10 rounded-full relative overflow-hidden"
                >
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "75%" }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                      repeatDelay: 5
                    }}
                    className="absolute inset-y-0 left-0 bg-blue-600 rounded-full"
                  />
                </motion.div>
                <motion.p 
                  className="text-2xl font-bold mt-2"
                  animate={{
                    scale: [1, 1.05, 1],
                    color: ['#1e40af', '#3b82f6', '#1e40af']
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 4
                  }}
                >
                  $47,500
                </motion.p>
              </Card>
            </motion.div>

            {/* Notifications */}
            <div className="space-y-2">
              {notifications.map((notification, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <Card className="p-3 flex items-center space-x-3 cursor-pointer">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600"
                    >
                      {notification.icon}
                    </motion.div>
                    <div>
                      <p className="text-sm font-medium">{notification.text}</p>
                      <p className="text-xs text-gray-500">{notification.subtext}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Chart */}
          <div className="relative">
            <motion.div>
              <Card className="p-4 h-full">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-medium text-gray-500">Occupancy Rate</h4>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 5
                    }}
                  >
                    <BarChart3 className="w-4 h-4 text-gray-400" />
                  </motion.div>
                </div>
                <div className="space-y-2">
                  {[85, 92, 88, 95].map((value, index) => (
                    <motion.div
                      key={index}
                      className="h-2 bg-blue-100 rounded-full overflow-hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <motion.div
                        className="h-full bg-blue-600 rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ width: `${value}%` }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          repeatType: "reverse",
                          repeatDelay: 5
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 