import React, { useState, useRef } from 'react';

// Data constants
const CHARACTERS_DATA = [
    {
        id: 1,
        name: 'HÌNH 1',
        color: 'bg-gradient-to-br from-amber-800 to-amber-900',
        textColor: 'text-amber-100',
        title: 'Warrior - Chiến Binh',
        subtitle: 'Sức mạnh và danh dự',
        description: 'Chiến binh mạnh mẽ với sức mạnh vượt trội. Chuyên về tấn công cận chiến và có khả năng phòng thủ tốt.',
        detailedContent: {
            story: 'Trong những ngày xa xưa, khi thế giới còn chìm trong bóng tối của những thế lực tà ác, những chiến binh dũng cảm đã đứng lên bảo vệ người dân vô tội. Họ không chỉ sở hữu sức mạnh thể chất vượt trội mà còn có trái tim nhân hậu và tinh thần kiên cường.',
            abilities: [
                'Sword Mastery - Thành thạo kiếm thuật',
                'Shield Defense - Phòng thủ bằng khiên',
                'Battle Cry - Tiếng gào chiến đấu',
                'Berserker Mode - Chế độ cuồng nộ'
            ],
            stats: { strength: 95, agility: 60, intelligence: 45, defense: 90 },
            equipment: ['Two-handed Sword', 'Heavy Armor', 'Tower Shield', 'War Horn']
        }
    },
    {
        id: 2,
        name: 'HÌNH 2',
        color: 'bg-gradient-to-br from-orange-500 to-red-600',
        textColor: 'text-orange-100',
        title: 'Mage - Pháp Sư',
        subtitle: 'Tri thức và ma thuật',
        description: 'Pháp sư thông thái với khả năng sử dụng ma thuật mạnh mẽ. Chuyên về tấn công tầm xa và phép thuật.',
        detailedContent: {
            story: 'Pháp sư là những người được ban tặng khả năng điều khiển các nguyên tố thiên nhiên. Họ dành cả đời để nghiên cứu các grimoire cổ xưa và rèn luyện khả năng triệu hồi những phép thuật mạnh mẽ có thể thay đổi cục diện trận chiến.',
            abilities: [
                'Fireball - Cầu lửa',
                'Ice Storm - Bão tuyết',
                'Lightning Bolt - Tia sét',
                'Teleportation - Dịch chuyển tức thời'
            ],
            stats: { strength: 30, agility: 50, intelligence: 98, defense: 35 },
            equipment: ['Ancient Staff', 'Spellbook', 'Mana Crystal', 'Wizard Robe']
        }
    },
    {
        id: 3,
        name: 'HÌNH 3',
        color: 'bg-gradient-to-br from-blue-600 to-indigo-700',
        textColor: 'text-blue-100',
        title: 'Archer - Cung Thủ',
        subtitle: 'Chính xác và nhanh nhẹn',
        description: 'Cung thủ khéo léo với khả năng bắn tỉa chính xác. Chuyên về tấn công tầm xa và di chuyển nhanh.',
        detailedContent: {
            story: 'Cung thủ là những người thợ săn bậc thầy, họ có thể bắn trúng mục tiêu từ khoảng cách xa một cách chính xác tuyệt đối. Được huấn luyện trong rừng sâu, họ hiểu rõ tự nhiên và có thể di chuyển âm thầm như gió.',
            abilities: [
                'Eagle Eye - Mắt đại bàng',
                'Multi-shot - Bắn liên hoàn',
                'Explosive Arrow - Mũi tên nổ',
                'Forest Camouflage - Ngụy trang rừng'
            ],
            stats: { strength: 60, agility: 92, intelligence: 70, defense: 55 },
            equipment: ['Elven Bow', 'Quiver of Arrows', 'Leather Armor', 'Hunting Knife']
        }
    },
    {
        id: 4,
        name: 'HÌNH 4',
        color: 'bg-gradient-to-br from-green-500 to-emerald-600',
        textColor: 'text-green-100',
        title: 'Assassin - Sát Thủ',
        subtitle: 'Bóng tối và sự bí ẩn',
        description: 'Sát thủ bí ẩn với tốc độ và sự linh hoạt vượt trội. Chuyên về tấn công bất ngờ và stealth.',
        detailedContent: {
            story: 'Sát thủ là những chiến binh của bóng tối, họ di chuyển trong im lặng và tấn công khi kẻ thù không ngờ tới. Được huấn luyện từ nhỏ trong các guild bí mật, họ thành thạo nghệ thuật ám sát và có thể biến mất không để lại dấu vết.',
            abilities: [
                'Stealth Mode - Chế độ tàng hình',
                'Backstab - Đâm lén sau lưng',
                'Poison Blade - Lưỡi dao tẩm độc',
                'Shadow Clone - Phân thân bóng tối'
            ],
            stats: { strength: 75, agility: 96, intelligence: 80, defense: 45 },
            equipment: ['Twin Daggers', 'Smoke Bombs', 'Black Cloak', 'Poison Vials']
        }
    }
];

// Utility functions
const getCharacterPosition = (index) => {
    const positions = [
        { top: '0%', left: '0%', width: '50%', height: '50%' },
        { top: '0%', right: '0%', width: '50%', height: '50%' },
        { bottom: '0%', left: '0%', width: '50%', height: '50%' },
        { bottom: '0%', right: '0%', width: '50%', height: '50%' }
    ];
    return positions[index];
};

const getStatDisplayName = (stat) => {
    const statNames = {
        strength: 'Sức Mạnh',
        agility: 'Nhanh Nhẹn',
        intelligence: 'Trí Tuệ',
        defense: 'Phòng Thủ'
    };
    return statNames[stat] || stat;
};

// Character Card Component
const CharacterCard = ({
    character,
    index,
    isHovered,
    isSelected,
    isOtherActive,
    onHover,
    onLeave,
    onClick
}) => {
    const position = getCharacterPosition(index);

    return (
        <div
            className={`
        absolute cursor-pointer transition-all duration-700 ease-out
        ${character.color}
        ${isOtherActive ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}
        ${isHovered ? 'z-10 shadow-2xl scale-105' : 'z-0'}
        ${isSelected ? 'ring-4 ring-white ring-opacity-50' : ''}
      `}
            style={position}
            onMouseEnter={() => onHover(index)}
            onMouseLeave={onLeave}
            onClick={() => onClick(index)}
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="w-full h-full bg-gradient-to-br from-white to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center">
                <div className={`
          ${character.textColor} transition-all duration-300
          ${isHovered || isSelected ? 'transform -translate-y-4' : ''}
        `}>
                    <h2 className="text-4xl md:text-6xl font-bold mb-4">
                        {character.name}
                    </h2>

                    {(isHovered || isSelected) && (
                        <CharacterPreview
                            title={character.title}
                            subtitle={character.subtitle}
                        />
                    )}
                </div>
            </div>

            {/* Diagonal Cut Effect */}
            <div className={`
        absolute inset-0 bg-black transition-opacity duration-300
        ${index % 2 === 0 ? 'clip-path-diagonal-left' : 'clip-path-diagonal-right'}
        ${isHovered ? 'opacity-0' : 'opacity-20'}
      `}></div>
        </div>
    );
};

// Character Preview Component (for hover state)
const CharacterPreview = ({ title, subtitle }) => (
    <div className="animate-in fade-in duration-300">
        <p className="text-xl md:text-2xl font-semibold mb-2">
            {title}
        </p>
        <p className="text-sm md:text-base opacity-90">
            {subtitle}
        </p>
        <div className="mt-4 px-4 py-2 bg-black bg-opacity-30 rounded-full">
            <span className="text-sm">Click để xem chi tiết</span>
        </div>
    </div>
);

// Character Selection Grid Component
const CharacterSelectionGrid = ({
    characters,
    hoveredIndex,
    selectedIndex,
    onHover,
    onLeave,
    onClick
}) => (
    <div className="h-screen relative overflow-hidden">
        {characters.map((character, index) => {
            const isHovered = hoveredIndex === index;
            const isSelected = selectedIndex === index;
            const isOtherActive = (hoveredIndex !== null && hoveredIndex !== index) ||
                (selectedIndex !== null && selectedIndex !== index);

            return (
                <CharacterCard
                    key={character.id}
                    character={character}
                    index={index}
                    isHovered={isHovered}
                    isSelected={isSelected}
                    isOtherActive={isOtherActive}
                    onHover={onHover}
                    onLeave={onLeave}
                    onClick={onClick}
                />
            );
        })}
    </div>
);

// Stats Component
const StatsSection = ({ stats }) => (
    <div>
        <h3 className="text-2xl font-bold text-white mb-6">Chỉ Số</h3>
        <div className="space-y-4">
            {Object.entries(stats).map(([stat, value]) => (
                <StatBar key={stat} stat={stat} value={value} />
            ))}
        </div>
    </div>
);

// Individual Stat Bar Component
const StatBar = ({ stat, value }) => (
    <div className="space-y-2">
        <div className="flex justify-between items-center">
            <span className="text-gray-300 capitalize font-medium">
                {getStatDisplayName(stat)}
            </span>
            <span className="text-white font-bold">{value}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
            <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${value}%` }}
            ></div>
        </div>
    </div>
);

// Abilities Component
const AbilitiesSection = ({ abilities }) => (
    <div>
        <h3 className="text-2xl font-bold text-white mb-4">Kỹ Năng Đặc Biệt</h3>
        <div className="grid gap-4">
            {abilities.map((ability, idx) => (
                <AbilityCard key={idx} ability={ability} />
            ))}
        </div>
    </div>
);

// Individual Ability Card Component
const AbilityCard = ({ ability }) => (
    <div className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors duration-200">
        <span className="text-blue-400 font-semibold">{ability}</span>
    </div>
);

// Equipment Component
const EquipmentSection = ({ equipment }) => (
    <div>
        <h3 className="text-2xl font-bold text-white mb-4">Trang Bị</h3>
        <div className="grid gap-3">
            {equipment.map((item, idx) => (
                <EquipmentItem key={idx} item={item} />
            ))}
        </div>
    </div>
);

// Individual Equipment Item Component
const EquipmentItem = ({ item }) => (
    <div className="bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg p-3">
        <span className="text-yellow-400 font-medium">⚔ {item}</span>
    </div>
);

// Action Buttons Component
const ActionButtons = ({ onBackToTop }) => (
    <div className="text-center space-y-4">
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-12 rounded-full text-lg transition-all duration-200 transform hover:scale-105">
            Chọn Nhân Vật Này
        </button>
        <br />
        <button
            onClick={onBackToTop}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-200"
        >
            ↑ Quay Lại Lựa Chọn
        </button>
    </div>
);

// Character Detail Section Component
const CharacterDetailSection = ({ character, onBackToTop }) => (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 animate-in slide-in-from-bottom duration-500">
        <div className="container mx-auto px-6 py-16">
            {/* Header */}
            <DetailHeader
                title={character.title}
                subtitle={character.subtitle}
            />

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-2 gap-16 mb-16">
                {/* Left Column - Story & Abilities */}
                <div className="space-y-8">
                    <StorySection story={character.detailedContent.story} />
                    <AbilitiesSection abilities={character.detailedContent.abilities} />
                </div>

                {/* Right Column - Stats & Equipment */}
                <div className="space-y-8">
                    <StatsSection stats={character.detailedContent.stats} />
                    <EquipmentSection equipment={character.detailedContent.equipment} />
                </div>
            </div>

            {/* Action Buttons */}
            <ActionButtons onBackToTop={onBackToTop} />
        </div>
    </div>
);

// Detail Header Component
const DetailHeader = ({ title, subtitle }) => (
    <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            {title}
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8">
            {subtitle}
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
    </div>
);

// Story Section Component
const StorySection = ({ story }) => (
    <div>
        <h2 className="text-3xl font-bold text-white mb-6">Câu Chuyện</h2>
        <p className="text-gray-300 text-lg leading-relaxed">
            {story}
        </p>
    </div>
);

// Custom Styles Component
const CustomStyles = () => (
    <style jsx>{`
    .clip-path-diagonal-left {
      clip-path: polygon(0 0, 85% 0, 100% 100%, 0 100%);
    }
    .clip-path-diagonal-right {
      clip-path: polygon(15% 0, 100% 0, 100% 100%, 0 100%);
    }
  `}</style>
);

// Main Component
const DiagonalCharacterSelection = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const detailSectionRef = useRef(null);

    const handleHover = (index) => setHoveredIndex(index);
    const handleLeave = () => setHoveredIndex(null);

    const handleClick = (index) => {
        if (selectedIndex === index) {
            setSelectedIndex(null);
        } else {
            setSelectedIndex(index);
            setTimeout(() => {
                detailSectionRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setSelectedIndex(null);
    };

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Main Selection Grid */}
            <CharacterSelectionGrid
                characters={CHARACTERS_DATA}
                hoveredIndex={hoveredIndex}
                selectedIndex={selectedIndex}
                onHover={handleHover}
                onLeave={handleLeave}
                onClick={handleClick}
            />

            {/* Detail Section */}
            {selectedIndex !== null && (
                <div ref={detailSectionRef}>
                    <CharacterDetailSection
                        character={CHARACTERS_DATA[selectedIndex]}
                        onBackToTop={scrollToTop}
                    />
                </div>
            )}

            {/* Custom Styles */}
            <CustomStyles />
        </div>
    );
};

export default DiagonalCharacterSelection;