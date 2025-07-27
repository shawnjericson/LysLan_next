// lib/searchSuggestions.js - Auto-complete và search suggestions
export const searchSuggestions = {
    vi: [
        // Chocolate types
        { term: 'chocolate đen', description: 'Chocolate đen cao cấp', category: 'type' },
        { term: 'chocolate sữa', description: 'Chocolate sữa béo ngậy', category: 'type' },
        { term: 'chocolate trắng', description: 'Chocolate trắng thơm vani', category: 'type' },
        { term: 'socola đắng', description: 'Socola đắng 70% cacao', category: 'type' },

        // Product types
        { term: 'truffle', description: 'Truffle chocolate mềm mịn', category: 'product' },
        { term: 'bonbon', description: 'Bonbon chocolate nhân đậm đà', category: 'product' },
        { term: 'thanh chocolate', description: 'Thanh chocolate nguyên chất', category: 'product' },
        { term: 'nama chocolate', description: 'Nama chocolate Nhật Bản', category: 'product' },
        { term: 'hạt phủ chocolate', description: 'Hạt nuts phủ chocolate', category: 'product' },

        // Flavors
        { term: 'vị cam', description: 'Chocolate vị cam tươi', category: 'flavor' },
        { term: 'vị dâu', description: 'Chocolate vị dâu tây', category: 'flavor' },
        { term: 'vị cafe', description: 'Chocolate vị cà phê đậm đà', category: 'flavor' },
        { term: 'vị trà xanh', description: 'Chocolate vị matcha', category: 'flavor' },
        { term: 'vị dừa', description: 'Chocolate vị dừa nhiệt đới', category: 'flavor' },

        // Occasions
        { term: 'quà tặng', description: 'Chocolate làm quà tặng', category: 'occasion' },
        { term: 'valentine', description: 'Chocolate cho ngày Valentine', category: 'occasion' },
        { term: 'sinh nhật', description: 'Chocolate sinh nhật đặc biệt', category: 'occasion' },
        { term: 'tết', description: 'Chocolate Tết Nguyên Đán', category: 'occasion' },
        { term: 'giáng sinh', description: 'Chocolate Giáng Sinh', category: 'occasion' },

        // Premium terms
        { term: 'cao cấp', description: 'Chocolate cao cấp nhập khẩu', category: 'quality' },
        { term: 'thủ công', description: 'Chocolate làm thủ công', category: 'quality' },
        { term: 'organic', description: 'Chocolate hữu cơ tự nhiên', category: 'quality' },
        { term: 'belgian', description: 'Chocolate Bỉ chính hiệu', category: 'quality' },

        // Sets
        { term: 'hộp quà', description: 'Hộp quà chocolate sang trọng', category: 'set' },
        { term: 'set chocolate', description: 'Set chocolate đa dạng', category: 'set' },
        { term: 'combo', description: 'Combo chocolate ưu đãi', category: 'set' },
    ],

    en: [
        // Chocolate types
        { term: 'dark chocolate', description: 'Premium dark chocolate', category: 'type' },
        { term: 'milk chocolate', description: 'Creamy milk chocolate', category: 'type' },
        { term: 'white chocolate', description: 'Vanilla white chocolate', category: 'type' },
        { term: 'bitter chocolate', description: '70% cacao bitter chocolate', category: 'type' },

        // Product types
        { term: 'truffle', description: 'Smooth chocolate truffle', category: 'product' },
        { term: 'bonbon', description: 'Rich chocolate bonbon', category: 'product' },
        { term: 'chocolate bar', description: 'Pure chocolate bar', category: 'product' },
        { term: 'nama chocolate', description: 'Japanese nama chocolate', category: 'product' },
        { term: 'coated nuts', description: 'Nuts coated in chocolate', category: 'product' },

        // Flavors
        { term: 'orange flavor', description: 'Fresh orange chocolate', category: 'flavor' },
        { term: 'strawberry flavor', description: 'Sweet strawberry chocolate', category: 'flavor' },
        { term: 'coffee flavor', description: 'Rich coffee chocolate', category: 'flavor' },
        { term: 'matcha flavor', description: 'Green tea chocolate', category: 'flavor' },
        { term: 'coconut flavor', description: 'Tropical coconut chocolate', category: 'flavor' },

        // Occasions
        { term: 'gift', description: 'Chocolate gifts', category: 'occasion' },
        { term: 'valentine', description: 'Valentine\'s Day chocolate', category: 'occasion' },
        { term: 'birthday', description: 'Birthday special chocolate', category: 'occasion' },
        { term: 'christmas', description: 'Christmas chocolate', category: 'occasion' },

        // Premium terms
        { term: 'premium', description: 'Premium imported chocolate', category: 'quality' },
        { term: 'handcrafted', description: 'Handcrafted artisan chocolate', category: 'quality' },
        { term: 'organic', description: 'Organic natural chocolate', category: 'quality' },
        { term: 'belgian', description: 'Authentic Belgian chocolate', category: 'quality' },

        // Sets
        { term: 'gift box', description: 'Luxury chocolate gift box', category: 'set' },
        { term: 'chocolate set', description: 'Diverse chocolate set', category: 'set' },
        { term: 'combo', description: 'Special chocolate combo', category: 'set' },
    ]
};

// Hàm lấy gợi ý dựa trên input
export function getSearchSuggestions(input, locale = 'vi', limit = 8) {
    if (!input || input.length < 1) return [];

    const suggestions = searchSuggestions[locale] || searchSuggestions.vi;
    const inputLower = input.toLowerCase();

    // Tìm matches với scoring
    const matches = suggestions
        .map(suggestion => {
            const termLower = suggestion.term.toLowerCase();
            let score = 0;

            // Exact start match - highest score
            if (termLower.startsWith(inputLower)) {
                score = 100;
            }
            // Contains match
            else if (termLower.includes(inputLower)) {
                score = 70;
            }
            // Word boundary match
            else if (termLower.split(' ').some(word => word.startsWith(inputLower))) {
                score = 60;
            }
            // Fuzzy match (for Vietnamese)
            else if (locale === 'vi') {
                const normalized = removeDiacritics(termLower);
                const inputNormalized = removeDiacritics(inputLower);

                if (normalized.startsWith(inputNormalized)) {
                    score = 50;
                } else if (normalized.includes(inputNormalized)) {
                    score = 30;
                }
            }

            return score > 0 ? { ...suggestion, score } : null;
        })
        .filter(Boolean)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);

    return matches;
}

// Helper function để bỏ dấu
function removeDiacritics(str) {
    return str.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D');
}

// Trending searches theo thời gian
export const trendingSearches = {
    vi: {
        daily: ['chocolate đen', 'truffle', 'quà valentine'],
        weekly: ['bonbon', 'chocolate sữa', 'hộp quà'],
        monthly: ['nama chocolate', 'set chocolate', 'cao cấp']
    },
    en: {
        daily: ['dark chocolate', 'truffle', 'valentine gift'],
        weekly: ['bonbon', 'milk chocolate', 'gift box'],
        monthly: ['nama chocolate', 'chocolate set', 'premium']
    }
};

// Lấy trending searches
export function getTrendingSearches(locale = 'vi', period = 'daily') {
    return trendingSearches[locale]?.[period] || trendingSearches.vi.daily;
}