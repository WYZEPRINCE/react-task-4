import React from "react";
import {
  Smartphone,
  Monitor,
  Watch,
  Camera,
  Headphones,
  Gamepad2,
} from "lucide-react";

const categories = [
  { id: 1, name: "Phones", icon: Smartphone, isActive: false },
  { id: 2, name: "Computers", icon: Monitor, isActive: false },
  { id: 3, name: "SmartWatch", icon: Watch, isActive: false },
  { id: 4, name: "Camera", icon: Camera, isActive: true },
  { id: 5, name: "HeadPhones", icon: Headphones, isActive: false },
  { id: 6, name: "Gaming", icon: Gamepad2, isActive: false },
];

{
  /* Categories Grid */
}
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
  {categories.map((category) => {
    const IconComponent = category.icon;

    return (
      <div
        key={category.id}
        className={`
                relative group p-8 rounded-lg border-2 transition-all duration-200 hover:scale-105
                ${
                  category.isActive
                    ? "bg-[#DB4444] border-[#DB4444] text-white shadow-lg"
                    : "bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:shadow-md"
                }
              `}
      >
        <div className="flex flex-col items-center gap-4">
          <IconComponent
            className={`w-12 h-12 ${
              category.isActive ? "text-white" : "text-gray-700"
            }`}
            strokeWidth={1.5}
          />
          <span
            className={`font-medium text-sm ${
              category.isActive ? "text-white" : "text-gray-900"
            }`}
          >
            {category.name}
          </span>
        </div>
      </div>
    );
  })}
</div>;
