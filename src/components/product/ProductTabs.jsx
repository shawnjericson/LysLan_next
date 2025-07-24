// src/components/ProductTabs.jsx
'use client';

import { useState } from 'react';

export default function ProductTabs({ product, locale }) {
    const [activeTab, setActiveTab] = useState('ingredients');

    const tabs = [
        {
            id: 'ingredients',
            label: locale === 'vi' ? 'Thành phần' : 'Ingredients',
            icon: ''
        },
        {
            id: 'storage',
            label: locale === 'vi' ? 'Bảo quản' : 'Storage',
            icon: ''
        },
        {
            id: 'flavors',
            label: locale === 'vi' ? 'Hương vị' : 'Flavors',
            icon: ''
        },
        {
            id: 'allergens',
            label: locale === 'vi' ? 'Dị ứng' : 'Allergens',
            icon: ''
        }
    ];

    return (
        <div className="w-full">
            {/* Tab Navigation */}
            <div className="flex flex-wrap border-b border-[#3e1f0e]/10 mb-6">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
              flex items-center gap-2 px-6 py-4 font-['Montserrat'] font-medium transition-all duration-300 relative
              ${activeTab === tab.id
                                ? 'text-[#DE9400] border-b-2 border-[#DE9400]'
                                : 'text-[#3e1f0e]/60 hover:text-[#3e1f0e] hover:bg-[#fff8f5]'
                            }
            `}
                    >
                        <span className="text-lg">{tab.icon}</span>
                        <span className="text-sm md:text-base">{tab.label}</span>

                        {/* Active indicator */}
                        {activeTab === tab.id && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#DE9400] to-yellow-400"></div>
                        )}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[200px]">
                {activeTab === 'ingredients' && (
                    <IngredientsTab product={product} locale={locale} />
                )}

                {activeTab === 'storage' && (
                    <StorageTab product={product} locale={locale} />
                )}

                {activeTab === 'flavors' && (
                    <FlavorsTab product={product} locale={locale} />
                )}

                {activeTab === 'allergens' && (
                    <AllergensTab product={product} locale={locale} />
                )}
            </div>
        </div>
    );
}

// Ingredients Tab Component
function IngredientsTab({ product, locale }) {
    return (
        <div className="space-y-6 animate-fadeIn">
            <h3 className="text-xl font-['Playfair_Display'] text-[#3e1f0e] mb-4">
                {locale === 'vi' ? 'Thành phần chi tiết' : 'Detailed Ingredients'}
            </h3>

            {product.ingredients && product.ingredients.length > 0 ? (
                <div className="space-y-4">
                    {product.ingredients.map((ingredient, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-4 bg-white rounded-lg border border-[#3e1f0e]/10 hover:shadow-md transition-shadow"
                        >
                            <div className="flex-1">
                                <h4 className="font-['Montserrat'] font-medium text-[#3e1f0e]">
                                    {ingredient.name}
                                </h4>
                                {ingredient.description && (
                                    <p className="text-sm text-[#3e1f0e]/70 font-['Montserrat'] mt-1">
                                        {ingredient.description}
                                    </p>
                                )}
                            </div>

                            {ingredient.percentage && (
                                <div className="ml-4 text-right">
                                    <span className="text-lg font-['Playfair_Display'] font-semibold text-[#DE9400]">
                                        {ingredient.percentage}%
                                    </span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-8">
                    <div className="text-6xl text-[#3e1f0e]/20 mb-4">🧪</div>
                    <p className="text-[#3e1f0e]/60 font-['Montserrat']">
                        {locale === 'vi'
                            ? 'Thông tin thành phần đang được cập nhật'
                            : 'Ingredient information is being updated'
                        }
                    </p>
                </div>
            )}
        </div>
    );
}

// Storage Tab Component  
function StorageTab({ product, locale }) {
    return (
        <div className="space-y-6 animate-fadeIn">
            <h3 className="text-xl font-['Playfair_Display'] text-[#3e1f0e] mb-4">
                {locale === 'vi' ? 'Hướng dẫn bảo quản' : 'Storage Instructions'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Temperature */}
                <div className="bg-white p-6 rounded-lg border border-[#3e1f0e]/10 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-[#DE9400]/10 rounded-full flex items-center justify-center">
                            <span className="text-lg">🌡️</span>
                        </div>
                        <h4 className="font-['Montserrat'] font-semibold text-[#3e1f0e]">
                            {locale === 'vi' ? 'Nhiệt độ' : 'Temperature'}
                        </h4>
                    </div>
                    <p className="text-[#3e1f0e]/80 font-['Montserrat']">
                        {product.storageTemperatureMin && product.storageTemperatureMax ? (
                            `${product.storageTemperatureMin}°C - ${product.storageTemperatureMax}°C`
                        ) : (
                            locale === 'vi' ? '18°C - 25°C (khuyến nghị)' : '18°C - 25°C (recommended)'
                        )}
                    </p>
                </div>

                {/* Environment */}
                <div className="bg-white p-6 rounded-lg border border-[#3e1f0e]/10 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-[#DE9400]/10 rounded-full flex items-center justify-center">
                            <span className="text-lg">💨</span>
                        </div>
                        <h4 className="font-['Montserrat'] font-semibold text-[#3e1f0e]">
                            {locale === 'vi' ? 'Môi trường' : 'Environment'}
                        </h4>
                    </div>
                    <p className="text-[#3e1f0e]/80 font-['Montserrat']">
                        {locale === 'vi' ? 'Nơi khô ráo & thoáng mát' : 'Dry & well-ventilated place'}
                    </p>
                </div>
            </div>

            {/* Storage Instructions */}
            <div className="bg-gradient-to-r from-[#fff8f5] to-[#f5f5f0] p-6 rounded-lg border border-[#3e1f0e]/10">
                <h4 className="font-['Montserrat'] font-semibold text-[#3e1f0e] mb-4">
                    {locale === 'vi' ? 'Lưu ý quan trọng' : 'Important Notes'}
                </h4>

                <div className="space-y-3">
                    {[
                        {
                            icon: '❄️',
                            text: locale === 'vi'
                                ? 'Tránh để trong tủ lạnh vì có thể làm chocolate bị nở hoa trắng'
                                : 'Avoid refrigeration as it may cause chocolate bloom'
                        },
                        {
                            icon: '☀️',
                            text: locale === 'vi'
                                ? 'Không để dưới ánh nắng trực tiếp hoặc nơi có nhiệt độ cao'
                                : 'Keep away from direct sunlight and high temperatures'
                        },
                        {
                            icon: '🌊',
                            text: locale === 'vi'
                                ? 'Tránh độ ẩm cao để giữ chocolate không bị chảy nước'
                                : 'Avoid high humidity to prevent chocolate from sweating'
                        },
                        {
                            icon: '📦',
                            text: locale === 'vi'
                                ? 'Bảo quản trong hộp kín để tránh hấp thụ mùi lạ'
                                : 'Store in airtight container to avoid absorbing odors'
                        }
                    ].map((item, index) => (
                        <div key={index} className="flex items-start gap-3">
                            <span className="text-lg flex-shrink-0">{item.icon}</span>
                            <p className="text-[#3e1f0e]/80 font-['Montserrat'] text-sm">
                                {item.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Expiry Info */}
            <div className="bg-white p-4 rounded-lg border border-[#DE9400]/20 border-l-4 border-l-[#DE9400]">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">⏰</span>
                    <h4 className="font-['Montserrat'] font-semibold text-[#3e1f0e]">
                        {locale === 'vi' ? 'Thời hạn sử dụng' : 'Shelf Life'}
                    </h4>
                </div>
                <p className="text-[#3e1f0e]/80 font-['Montserrat'] text-sm">
                    {locale === 'vi'
                        ? 'Thường từ 6-12 tháng kể từ ngày sản xuất khi bảo quản đúng cách'
                        : 'Usually 6-12 months from production date when stored properly'
                    }
                </p>
            </div>
        </div>
    );
}

// Flavors Tab Component
function FlavorsTab({ product, locale }) {
    return (
        <div className="space-y-6 animate-fadeIn">
            <h3 className="text-xl font-['Playfair_Display'] text-[#3e1f0e] mb-4">
                {locale === 'vi' ? 'Hương vị đặc trưng' : 'Distinctive Flavors'}
            </h3>

            {product.flavors && product.flavors.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.flavors.map((flavor, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-lg border border-[#3e1f0e]/10 hover:shadow-md transition-all duration-300 group"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-[#DE9400]/20 to-[#DE9400]/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <span className="text-xl">{getFlavorIcon(flavor.name)}</span>
                                </div>
                                <h4 className="font-['Montserrat'] font-semibold text-[#3e1f0e]">
                                    {flavor.name}
                                </h4>
                            </div>

                            {flavor.description && (
                                <p className="text-[#3e1f0e]/70 font-['Montserrat'] text-sm leading-relaxed">
                                    {flavor.description}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-8">
                    <div className="text-6xl text-[#3e1f0e]/20 mb-4">🎭</div>
                    <p className="text-[#3e1f0e]/60 font-['Montserrat']">
                        {locale === 'vi'
                            ? 'Thông tin hương vị đang được cập nhật'
                            : 'Flavor information is being updated'
                        }
                    </p>
                </div>
            )}

            {/* Flavor Profile */}
            <div className="bg-gradient-to-r from-[#fff8f5] to-[#f5f5f0] p-6 rounded-lg border border-[#3e1f0e]/10">
                <h4 className="font-['Montserrat'] font-semibold text-[#3e1f0e] mb-4">
                    {locale === 'vi' ? 'Đặc điểm hương vị' : 'Flavor Profile'}
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                        <div className="text-2xl mb-2">😋</div>
                        <h5 className="font-['Montserrat'] font-medium text-[#3e1f0e] text-sm">
                            {locale === 'vi' ? 'Vị ngọt' : 'Sweetness'}
                        </h5>
                        <div className="flex justify-center mt-2">
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className={`w-2 h-2 rounded-full ${i < 4 ? 'bg-[#DE9400]' : 'bg-gray-300'}`} />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <div className="text-2xl mb-2">🍫</div>
                        <h5 className="font-['Montserrat'] font-medium text-[#3e1f0e] text-sm">
                            {locale === 'vi' ? 'Đậm đà' : 'Richness'}
                        </h5>
                        <div className="flex justify-center mt-2">
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className={`w-2 h-2 rounded-full ${i < 5 ? 'bg-[#DE9400]' : 'bg-gray-300'}`} />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <div className="text-2xl mb-2">✨</div>
                        <h5 className="font-['Montserrat'] font-medium text-[#3e1f0e] text-sm">
                            {locale === 'vi' ? 'Tinh tế' : 'Complexity'}
                        </h5>
                        <div className="flex justify-center mt-2">
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className={`w-2 h-2 rounded-full ${i < 4 ? 'bg-[#DE9400]' : 'bg-gray-300'}`} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Allergens Tab Component
function AllergensTab({ product, locale }) {
    return (
        <div className="space-y-6 animate-fadeIn">
            <h3 className="text-xl font-['Playfair_Display'] text-[#3e1f0e] mb-4">
                {locale === 'vi' ? 'Thông tin dị ứng' : 'Allergen Information'}
            </h3>

            {product.allergens && product.allergens.length > 0 ? (
                <div className="space-y-4">
                    {product.allergens.map((allergen, index) => (
                        <div
                            key={index}
                            className="bg-red-50 border border-red-200 p-4 rounded-lg"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-2xl">⚠️</span>
                                <h4 className="font-['Montserrat'] font-semibold text-red-800">
                                    {allergen.name}
                                </h4>
                            </div>

                            {allergen.warningText && (
                                <p className="text-red-700 font-['Montserrat'] text-sm">
                                    {allergen.warningText}
                                </p>
                            )}

                            {allergen.description && (
                                <p className="text-red-600 font-['Montserrat'] text-sm mt-2">
                                    {allergen.description}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-green-50 border border-green-200 p-6 rounded-lg text-center">
                    <div className="text-4xl text-green-600 mb-3">✅</div>
                    <h4 className="font-['Montserrat'] font-semibold text-green-800 mb-2">
                        {locale === 'vi' ? 'Không có thành phần dị ứng' : 'No Allergens'}
                    </h4>
                    <p className="text-green-700 font-['Montserrat'] text-sm">
                        {locale === 'vi'
                            ? 'Sản phẩm này không chứa các thành phần gây dị ứng phổ biến'
                            : 'This product does not contain common allergens'
                        }
                    </p>
                </div>
            )}

            {/* General Warning */}
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                    <span className="text-xl flex-shrink-0">⚡</span>
                    <div>
                        <h4 className="font-['Montserrat'] font-semibold text-yellow-800 mb-2">
                            {locale === 'vi' ? 'Lưu ý quan trọng' : 'Important Notice'}
                        </h4>
                        <p className="text-yellow-700 font-['Montserrat'] text-sm">
                            {locale === 'vi'
                                ? 'Sản phẩm được sản xuất trong cơ sở có thể xử lý các chất gây dị ứng khác. Vui lòng tham khảo ý kiến bác sĩ nếu bạn có tiền sử dị ứng.'
                                : 'This product is manufactured in a facility that may process other allergens. Please consult your doctor if you have a history of allergies.'
                            }
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Helper function to get flavor icons
function getFlavorIcon(flavorName) {
    const flavorIcons = {
        'Hạt': '🥜',
        'Nuts': '🥜',
        'Trái cây': '🍓',
        'Fruits': '🍓',
        'Cà phê': '☕',
        'Coffee': '☕',
        'Caramel': '🍯',
        'Rượu': '🍷',
        'Alcohol': '🍷',
        'Truyền thống': '🍫',
        'Traditional': '🍫',
        'Trà': '🍵',
        'Tea': '🍵',
        'Kem Sữa': '🥛',
        'Cream': '🥛',
        'Trứng': '🥚',
        'Egg': '🥚'
    };

    return flavorIcons[flavorName] || '🍫';
}

// CSS Styles
if (typeof document !== 'undefined') {
    const styles = `
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .animate-fadeIn {
      animation: fadeIn 0.3s ease-out;
    }
  `;

    // Check if styles already exist
    if (!document.querySelector('#product-tabs-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'product-tabs-styles';
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
}