import React from 'react';
import { Clock, Calendar, User, Filter, X } from 'lucide-react';
import { BlogPostType } from '../types/blog';
import { t, latinToCyrillic, formatSerbianDate } from '../utils/textConverter';

interface HomepageProps {
  onViewPost: (postId: string) => void;
  posts: BlogPostType[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

export const Homepage: React.FC<HomepageProps> = ({ 
  onViewPost, 
  posts, 
  selectedCategory, 
  onCategorySelect 
}) => {
  const featuredPost = posts.find(post => post.featured);
  const recentPosts = posts.filter(post => !post.featured).slice(0, 6);
  const latestPost = recentPosts[0]; // Get the most recent non-featured post

  const getCategoryDisplayName = (category: string) => {
    const categoryMap: Record<string, string> = {
      'Culture': 'Култура',
      'Environment': 'Природа',
     
    };
    return categoryMap[category] || category;
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Category Filter Banner */}
      {selectedCategory !== 'all' && (
        <section className="mb-8">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Filter className="w-5 h-5 text-amber-600" />
                <span className="text-amber-800 font-medium">
                  Филтрирано по категорији: <strong>{getCategoryDisplayName(selectedCategory)}</strong>
                </span>
                <span className="bg-amber-200 text-amber-800 px-2 py-1 rounded-full text-sm">
                  {posts.length} {posts.length === 1 ? 'прича' : 'прича'}
                </span>
              </div>
              <button
                onClick={() => onCategorySelect('all')}
                className="flex items-center space-x-1 text-amber-700 hover:text-amber-900 font-medium"
              >
                <X className="w-4 h-4" />
                <span>Уклони филтер</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Hero Section */}
      <section className="text-center mb-16">
        <h2 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6 leading-tight">
          {selectedCategory === 'all' ? (
            <>
              {t('Stories Worth')}
              <span className="text-amber-600 block">{t('Reading')}</span>
            </>
          ) : (
            <>
              Приче о
              <span className="text-amber-600 block">{getCategoryDisplayName(selectedCategory)}</span>
            </>
          )}
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          {selectedCategory === 'all' 
            ? t('Discover thoughtful articles, deep insights, and beautiful narratives crafted for the modern reader.')
            : `Откријте занимљиве приче и дубоке увиде о ${getCategoryDisplayName(selectedCategory).toLowerCase()}.`
          }
        </p>
      </section>

      {/* No Posts Message */}
      {posts.length === 0 && (
        <section className="text-center py-16">
          <div className="max-w-md mx-auto">
            <Filter className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-serif font-bold text-gray-600 mb-4">
              Нема прича у овој категорији
            </h3>
            <p className="text-gray-500 mb-6">
              Тренутно нема објављених прича за категорију "{getCategoryDisplayName(selectedCategory)}".
            </p>
            <button
              onClick={() => onCategorySelect('all')}
              className="bg-amber-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors duration-200"
            >
              Погледај све приче
            </button>
          </div>
        </section>
      )}

      {/* Featured and Latest Posts Section */}
      {posts.length > 0 && (
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Featured Post */}
            {featuredPost && (
              <div>
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">{t('Featured Story')}</h3>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                     onClick={() => onViewPost(featuredPost.id)}>
                  <div className="relative overflow-hidden">
                    <img
                      src={featuredPost.image}
                      alt={latinToCyrillic(featuredPost.title)}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                        Истакнуто
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-serif font-bold text-gray-900 mb-3 leading-tight hover:text-amber-700 transition-colors duration-200">
                      {latinToCyrillic(featuredPost.title)}
                    </h4>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {latinToCyrillic(featuredPost.excerpt)}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        <span>{latinToCyrillic(featuredPost.author)}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatSerbianDate(featuredPost.date)}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {featuredPost.readTime.replace('min read', t('min read'))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Latest Post */}
            {latestPost && (
              <div>
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">{t('Latest Story')}</h3>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                     onClick={() => onViewPost(latestPost.id)}>
                  <div className="relative overflow-hidden">
                    <img
                      src={latestPost.image}
                      alt={latinToCyrillic(latestPost.title)}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        Најновије
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-serif font-bold text-gray-900 mb-3 leading-tight hover:text-amber-700 transition-colors duration-200">
                      {latinToCyrillic(latestPost.title)}
                    </h4>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {latinToCyrillic(latestPost.excerpt)}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        <span>{latinToCyrillic(latestPost.author)}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatSerbianDate(latestPost.date)}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {latestPost.readTime.replace('min read', t('min read'))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Recent Posts Grid */}
      {recentPosts.length > 1 && (
        <section>
          <h3 className="text-3xl font-serif font-bold text-gray-900 mb-8 text-center">
            {selectedCategory === 'all' ? t('Recent Stories') : `Остале приче о ${getCategoryDisplayName(selectedCategory).toLowerCase()}`}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.slice(1).map((post) => ( // Skip the first post since it's shown as latest
              <article
                key={post.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer"
                onClick={() => onViewPost(post.id)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={latinToCyrillic(post.title)}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                      {getCategoryDisplayName(post.category)}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-serif font-bold text-gray-900 mb-3 leading-tight group-hover:text-amber-700 transition-colors duration-200">
                    {latinToCyrillic(post.title)}
                  </h4>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {latinToCyrillic(post.excerpt)}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      <span>{latinToCyrillic(post.author)}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatSerbianDate(post.date)}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readTime.replace('min read', t('min read'))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
