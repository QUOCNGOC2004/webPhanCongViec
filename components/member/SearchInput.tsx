// app/components/SearchInput.tsx

import { Icon } from "./Icons";

export const SearchInput = () => {
    return (
        <div className="relative w-full max-w-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon name="search" className="w-5 h-5 text-gray-400" />
            </div>
            <input
                type="text"
                placeholder="Tìm kiếm thành viên..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
        </div>
    );
};