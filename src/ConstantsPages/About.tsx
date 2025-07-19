import { MapPin, Users, Bot, Sparkles, Heart, Globe, Compass, Star } from 'lucide-react';

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/10 to-orange-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-amber-700 border border-amber-200">
              <Star className="w-4 h-4" />
              <span>Graduation Project 2024</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Discover Egypt Like
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600"> Never Before</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            The ultimate AI-powered platform that brings together tourism partnerships, personalized recommendations, 
            and comprehensive travel guides to help you explore the wonders of Egypt.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center space-x-2 text-amber-700">
              <Bot className="w-5 h-5" />
              <span className="font-medium">AI-Powered Recommendations</span>
            </div>
            <div className="flex items-center space-x-2 text-orange-700">
              <Users className="w-5 h-5" />
              <span className="font-medium">Curated Partnerships</span>
            </div>
            <div className="flex items-center space-x-2 text-amber-700">
              <MapPin className="w-5 h-5" />
              <span className="font-medium">Destination Guides</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About EgyptExplorer</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Born from a vision to revolutionize how people discover and experience Egypt's rich cultural heritage
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200">
                <Globe className="w-12 h-12 text-amber-600 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  To create a unified platform that aggregates tourism partnerships and travel experiences, 
                  making Egypt's incredible destinations accessible to everyone through intelligent AI recommendations 
                  and comprehensive travel support.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-200">
                <Heart className="w-12 h-12 text-orange-600 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  To become the leading digital gateway for Egyptian tourism, connecting travelers with authentic 
                  experiences while supporting local communities and preserving our cultural heritage.
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-amber-600 to-orange-600 rounded-3xl p-8 text-white">
              <Sparkles className="w-16 h-16 text-amber-200 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Why EgyptExplorer?</h3>
              <ul className="space-y-3 text-amber-100">
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-amber-300 rounded-full mt-2 flex-shrink-0"></span>
                  <span>AI-driven personalized trip recommendations based on your interests</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-amber-300 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Comprehensive destination guides with insider tips and local insights</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-amber-300 rounded-full mt-2 flex-shrink-0"></span>
                  <span>24/7 chatbot assistance for instant travel support</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-amber-300 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Curated partnerships with trusted tourism providers</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Platform Features</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Cutting-edge technology meets authentic Egyptian hospitality
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-200 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-orange-600 rounded-lg flex items-center justify-center mb-4">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">AI Recommendations</h3>
              <p className="text-gray-600">
                Smart suggestions for events, activities, and destinations based on your preferences and behavior.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-200 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-red-600 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Tourism Partnerships</h3>
              <p className="text-gray-600">
                Verified partnerships with hotels, tour operators, and local businesses for authentic experiences.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-amber-200 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-yellow-600 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Destination Guides</h3>
              <p className="text-gray-600">
                Comprehensive guides covering famous landmarks, transportation, and must-do activities.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-200 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-amber-600 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Smart Chatbot</h3>
              <p className="text-gray-600">
                24/7 AI-powered assistance for trip planning, recommendations, and travel support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Nine passionate students working together to revolutionize Egyptian tourism
            </p>
          </div>
          
          {/* Team Overview */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 text-center border border-blue-200">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Backend Team</h3>
              <p className="text-gray-600 mb-4">Building robust server infrastructure and APIs</p>
              <div className="flex justify-center space-x-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 text-center border border-green-200">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Frontend Team</h3>
              <p className="text-gray-600 mb-4">Creating beautiful, responsive user interfaces</p>
              <div className="flex justify-center space-x-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-6 text-center border border-purple-200">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">AI Team</h3>
              <p className="text-gray-600 mb-4">Developing intelligent recommendation systems</p>
              <div className="flex justify-center space-x-2">
                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 text-center border border-orange-200">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Compass className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Mobile Team</h3>
              <p className="text-gray-600 mb-4">Building cross-platform mobile applications</p>
              <div className="flex justify-center space-x-2">
                <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
              </div>
            </div>
          </div>

          {/* Individual Team Members */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Our Team Members</h3>
            
            {/* Backend Team Members */}
            <div className="mb-12">
              <h4 className="text-xl font-semibold text-blue-600 mb-6 text-center">Backend Development Team</h4>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 text-center border border-blue-200 hover:shadow-lg transition-shadow">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-blue-200">
                    <img 
                     src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400"  
                      alt="Backend Developer 1" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h5 className="text-lg font-bold text-gray-900 mb-2">Abdalla Elsaied</h5>
                  <p className="text-blue-600 font-medium mb-2">Backend Developer</p>
                  <p className="text-gray-600 text-sm">Specializes in API architecture and database optimization</p>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 text-center border border-blue-200 hover:shadow-lg transition-shadow">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-blue-200">
                    <img 
                      src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400"  
                      alt="Backend Developer 2" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h5 className="text-lg font-bold text-gray-900 mb-2">Abdalla Agag</h5>
                  <p className="text-blue-600 font-medium mb-2">Backend Developer</p>
                  <p className="text-gray-600 text-sm">Expert in server infrastructure and cloud deployment</p>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 text-center border border-blue-200 hover:shadow-lg transition-shadow">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-blue-200">
                    <img 
                      src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400" 
                      alt="Backend Developer 3" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h5 className="text-lg font-bold text-gray-900 mb-2">Abdallah Abdrabo</h5>
                  <p className="text-blue-600 font-medium mb-2">Backend Developer</p>
                  <p className="text-gray-600 text-sm">Focuses on security and performance optimization</p>
                </div>
              </div>
            </div>

            {/* Frontend Team Members */}
            <div className="mb-12">
              <h4 className="text-xl font-semibold text-green-600 mb-6 text-center">Frontend Development Team</h4>
              <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 text-center border border-green-200 hover:shadow-lg transition-shadow">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-green-200">
                    <img 
                      src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400"  
                      alt="Frontend Developer 1" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h5 className="text-lg font-bold text-gray-900 mb-2">Ahmed Mahgoob</h5>
                  <p className="text-green-600 font-medium mb-2">Lead Frontend Developer</p>
                  <p className="text-gray-600 text-sm">UI/UX specialist with expertise in React and modern web technologies</p>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 text-center border border-green-200 hover:shadow-lg transition-shadow">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-green-200">
                    <img 
                      src="https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=400"
                      alt="Frontend Developer 2" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h5 className="text-lg font-bold text-gray-900 mb-2">Ola Belal</h5>
                  <p className="text-green-600 font-medium mb-2">Frontend Developer</p>
                  <p className="text-gray-600 text-sm">Specializes in responsive design and user experience optimization</p>
                </div>
              </div>
            </div>

            {/* AI Team Members */}
            <div className="mb-12">
              <h4 className="text-xl font-semibold text-purple-600 mb-6 text-center">AI Development Team</h4>
              <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-6 text-center border border-purple-200 hover:shadow-lg transition-shadow">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-purple-200">
                    <img 
                      src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400" 
                      alt="AI Developer 1" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h5 className="text-lg font-bold text-gray-900 mb-2">Abdallah Ibrahim</h5>
                  <p className="text-purple-600 font-medium mb-2">AI/ML Engineer</p>
                  <p className="text-gray-600 text-sm">Expert in machine learning algorithms and recommendation systems</p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-6 text-center border border-purple-200 hover:shadow-lg transition-shadow">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-purple-200">
                    <img 
                      src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400" 
                      alt="AI Developer 2" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h5 className="text-lg font-bold text-gray-900 mb-2">Ahmed Tarek</h5>
                  <p className="text-purple-600 font-medium mb-2">AI Developer</p>
                  <p className="text-gray-600 text-sm">Focuses on natural language processing and chatbot development</p>
                </div>
              </div>
            </div>

            {/* Mobile Team Members */}
            <div className="mb-12">
              <h4 className="text-xl font-semibold text-orange-600 mb-6 text-center">Mobile Development Team</h4>
              <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 text-center border border-orange-200 hover:shadow-lg transition-shadow">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-orange-200">
                    <img 
                      src="https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=400" 
                      alt="Mobile Developer 1" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h5 className="text-lg font-bold text-gray-900 mb-2">Alaa Raslan</h5>
                  <p className="text-orange-600 font-medium mb-2">Mobile App Developer</p>
                  <p className="text-gray-600 text-sm">Specializes in cross-platform mobile development and user interfaces</p>
                </div>
                
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 text-center border border-orange-200 hover:shadow-lg transition-shadow">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-orange-200">
                    <img 
                      src="https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=400" 
                      alt="Mobile Developer 2" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h5 className="text-lg font-bold text-gray-900 mb-2">Nada Omar</h5>
                  <p className="text-orange-600 font-medium mb-2">Mobile Developer</p>
                  <p className="text-gray-600 text-sm">Expert in mobile app architecture and performance optimization</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-4 rounded-full">
              <Users className="w-6 h-6" />
              <span className="text-lg font-medium">9 Team Members</span>
              <span className="text-amber-200">•</span>
             <span className="text-lg font-medium">1 Vision</span>
              <span className="text-amber-200">•</span>
              <span className="text-lg font-medium">4 Specialized Teams</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;