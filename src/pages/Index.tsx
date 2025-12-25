import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

const services = [
  { id: 1, name: 'Внесение мелиорантов', icon: 'Droplets', price: 350, description: 'Точное внесение извести и гипса для улучшения структуры почвы' },
  { id: 2, name: 'Внесение удобрений', icon: 'Sparkles', price: 400, description: 'Равномерное распределение минеральных и органических удобрений' },
  { id: 3, name: 'Опрыскивание СЗР', icon: 'Sprout', price: 450, description: 'Защита растений от болезней, вредителей и сорняков' },
  { id: 4, name: 'Десикация', icon: 'Wind', price: 420, description: 'Предуборочная обработка для ускорения созревания культур' },
  { id: 5, name: 'Мониторинг посевов', icon: 'Eye', price: 300, description: 'NDVI-съёмка для оценки состояния растений' },
  { id: 6, name: 'Аэрофотосъёмка', icon: 'Camera', price: 500, description: 'Высокоточная съёмка и 3D-моделирование территории' },
  { id: 7, name: 'Точечное опрыскивание', icon: 'Target', price: 480, description: 'Обработка локальных очагов с минимальным расходом препаратов' },
  { id: 8, name: 'Посев мелкосеменных', icon: 'Leaf', price: 380, description: 'Высев рапса, горчицы, многолетних трав' },
  { id: 9, name: 'Внесение биоагентов', icon: 'Bug', price: 430, description: 'Применение трихограммы и других биологических средств защиты' },
  { id: 10, name: 'Полив и увлажнение', icon: 'CloudRain', price: 390, description: 'Точечный полив и увлажнение посевов' },
  { id: 11, name: 'Генерация тумана', icon: 'Cloud', price: 370, description: 'Защита от заморозков и засухи' },
  { id: 12, name: 'Инвентаризация работ', icon: 'ClipboardCheck', price: 320, description: 'Контроль выполнения агротехнических операций' },
  { id: 13, name: 'Обследование почв', icon: 'MapPin', price: 460, description: 'Детальное картирование рельефа и типов почв' },
  { id: 14, name: 'Контроль уборки', icon: 'Wheat', price: 340, description: 'Мониторинг процесса уборки урожая' },
  { id: 15, name: 'Фитосанитарный скрининг', icon: 'Search', price: 410, description: 'Выявление очагов болезней и вредителей на ранних стадиях' },
];

const blogPosts = [
  {
    title: 'Как агродроны экономят до 40% химикатов',
    date: '15 декабря 2024',
    excerpt: 'Точное внесение препаратов позволяет снизить затраты и улучшить экологию полей'
  },
  {
    title: 'NDVI-мониторинг: зачем следить за посевами с воздуха',
    date: '10 декабря 2024',
    excerpt: 'Современные технологии помогают выявлять проблемы задолго до их визуального проявления'
  },
  {
    title: 'Десикация дронами: опыт хозяйств Краснодара',
    date: '5 декабря 2024',
    excerpt: 'Реальные кейсы применения беспилотников для предуборочной подготовки'
  }
];

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [area, setArea] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    company: '',
    message: ''
  });

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleService = (id: number) => {
    setSelectedServices(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const calculateTotal = () => {
    const areaNum = parseFloat(area) || 0;
    const servicesTotal = selectedServices.reduce((sum, id) => {
      const service = services.find(s => s.id === id);
      return sum + (service?.price || 0);
    }, 0);
    return (servicesTotal * areaNum).toLocaleString('ru-RU');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
    setFormData({ name: '', phone: '', company: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-green-100 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Plane" className="text-primary" size={32} />
              <span className="text-2xl font-bold text-primary">АэроВектор</span>
            </div>
            <button
              className="md:hidden p-2 hover:bg-green-50 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Меню"
            >
              <Icon name={mobileMenuOpen ? "X" : "Menu"} className="text-primary" size={28} />
            </button>
            <div className="hidden md:flex gap-6">
              {['home', 'services', 'technology', 'calculator', 'about', 'blog', 'contacts'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === section ? 'text-primary' : 'text-foreground/70'
                  }`}
                >
                  {section === 'home' && 'Главная'}
                  {section === 'services' && 'Услуги'}
                  {section === 'technology' && 'Технология'}
                  {section === 'calculator' && 'Калькулятор'}
                  {section === 'about' && 'О компании'}
                  {section === 'blog' && 'Блог'}
                  {section === 'contacts' && 'Контакты'}
                </button>
              ))}
            </div>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 animate-fade-in">
              <div className="flex flex-col gap-3">
                {['home', 'services', 'technology', 'calculator', 'about', 'blog', 'contacts'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                      activeSection === section
                        ? 'bg-green-50 text-primary'
                        : 'text-foreground/70 hover:bg-green-50/50 hover:text-primary'
                    }`}
                  >
                    {section === 'home' && 'Главная'}
                    {section === 'services' && 'Услуги'}
                    {section === 'technology' && 'Технология'}
                    {section === 'calculator' && 'Калькулятор'}
                    {section === 'about' && 'О компании'}
                    {section === 'blog' && 'Блог'}
                    {section === 'contacts' && 'Контакты'}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      <section id="home" className="py-20 px-4 bg-gradient-to-br from-green-600 to-green-800 text-white">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Точное земледелие с высоты
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-50">
              Передовые агродронные технологии для эффективного и экологичного сельского хозяйства
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => scrollToSection('calculator')}
                className="text-lg"
              >
                Рассчитать стоимость
                <Icon name="Calculator" className="ml-2" size={20} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection('services')}
                className="text-lg bg-white/10 hover:bg-white/20 text-white border-white/30"
              >
                Наши услуги
                <Icon name="ChevronRight" className="ml-2" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: 'TrendingUp', title: 'Экономия до 40%', desc: 'Снижение расхода химикатов и топлива' },
              { icon: 'Clock', title: 'В 5 раз быстрее', desc: 'По сравнению с наземной техникой' },
              { icon: 'Leaf', title: 'Экологичность', desc: 'Минимальное воздействие на почву и посевы' }
            ].map((item, idx) => (
              <Card key={idx} className="text-center border-green-100 hover:shadow-lg transition-shadow animate-slide-up">
                <CardHeader>
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name={item.icon as any} className="text-primary" size={32} />
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-16 px-4 bg-green-50/50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Наши услуги</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Комплексные решения для точного земледелия с использованием современных агродронов
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card key={service.id} className="hover:shadow-lg transition-all hover:-translate-y-1 border-green-100">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={service.icon as any} className="text-primary" size={24} />
                    </div>
                    <div>
                      <CardTitle className="text-lg mb-2">{service.name}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary">от {service.price} ₽/га</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="technology" className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Наша технология</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6">Агродроны нового поколения</h3>
              <div className="space-y-4">
                {[
                  { title: 'Высокая производительность', desc: 'До 15 га в час обработки полей' },
                  { title: 'Точность внесения', desc: 'GPS-навигация с точностью до 10 см' },
                  { title: 'Автономность', desc: 'Автоматический полёт по заданному маршруту' },
                  { title: 'Универсальность', desc: 'Работа с любыми типами препаратов и удобрений' }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="Check" className="text-primary" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-12 flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <Icon name="Plane" className="text-primary mx-auto mb-4" size={120} />
                <p className="text-lg font-semibold text-green-800">DJI Agras T40</p>
                <p className="text-sm text-green-600">Флагманский агродрон</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="calculator" className="py-16 px-4 bg-green-50/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-4">Калькулятор стоимости</h2>
          <p className="text-center text-muted-foreground mb-12">
            Выберите услуги и площадь обработки для расчёта стоимости
          </p>
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle>Рассчитать стоимость услуг</CardTitle>
              <CardDescription>Выберите нужные услуги и укажите площадь вашего поля</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-semibold mb-4 block">Выберите услуги:</Label>
                <div className="grid md:grid-cols-2 gap-3">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => toggleService(service.id)}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        selectedServices.includes(service.id)
                          ? 'border-primary bg-green-50'
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          selectedServices.includes(service.id) ? 'bg-primary' : 'bg-gray-100'
                        }`}>
                          <Icon
                            name={service.icon as any}
                            className={selectedServices.includes(service.id) ? 'text-white' : 'text-gray-600'}
                            size={18}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm mb-1">{service.name}</p>
                          <p className="text-primary font-semibold text-sm">{service.price} ₽/га</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="area" className="text-base font-semibold">Площадь поля (га)</Label>
                <Input
                  id="area"
                  type="number"
                  placeholder="Введите площадь в гектарах"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="mt-2"
                />
              </div>

              {selectedServices.length > 0 && area && (
                <div className="bg-green-50 p-6 rounded-lg border-2 border-primary/20 animate-fade-in">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Выбрано услуг:</span>
                    <span className="text-lg">{selectedServices.length}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Площадь:</span>
                    <span className="text-lg">{area} га</span>
                  </div>
                  <div className="border-t border-green-200 pt-4 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold">Итого:</span>
                      <span className="text-3xl font-bold text-primary">{calculateTotal()} ₽</span>
                    </div>
                  </div>
                </div>
              )}

              <Button
                className="w-full"
                size="lg"
                onClick={() => scrollToSection('contacts')}
                disabled={selectedServices.length === 0 || !area}
              >
                Оставить заявку
                <Icon name="Send" className="ml-2" size={18} />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="about" className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12">О компании</h2>
          <Card className="border-green-100">
            <CardContent className="pt-6">
              <p className="text-lg leading-relaxed mb-6">
                <strong>ООО "АэроВектор"</strong> — ведущий поставщик услуг точного земледелия с использованием
                беспилотных агротехнологий в России. Мы помогаем сельхозпроизводителям и крестьянским хозяйствам
                повысить эффективность производства, снизить затраты и заботиться об экологии.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">500+</div>
                  <p className="text-muted-foreground">Довольных клиентов</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">50 000+</div>
                  <p className="text-muted-foreground">Гектаров обработано</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">15+</div>
                  <p className="text-muted-foreground">Регионов присутствия</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="blog" className="py-16 px-4 bg-green-50/50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Блог</h2>
          <p className="text-center text-muted-foreground mb-12">Полезные материалы о точном земледелии</p>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {blogPosts.map((post, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow border-green-100">
                <CardHeader>
                  <div className="w-full h-40 bg-gradient-to-br from-green-100 to-green-200 rounded-lg mb-4 flex items-center justify-center">
                    <Icon name="FileText" className="text-primary" size={48} />
                  </div>
                  <CardTitle className="text-lg">{post.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-2">
                    <Icon name="Calendar" size={14} />
                    {post.date}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                  <Button variant="link" className="px-0 mt-4">
                    Читать далее
                    <Icon name="ArrowRight" className="ml-1" size={16} />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-4">Контакты</h2>
          <p className="text-center text-muted-foreground mb-12">
            Оставьте заявку, и мы свяжемся с вами в ближайшее время
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-green-100">
              <CardHeader>
                <CardTitle>Оставить заявку</CardTitle>
                <CardDescription>Заполните форму для консультации</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Имя *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Телефон *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Хозяйство / Компания</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Сообщение</Label>
                    <Textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    Отправить заявку
                    <Icon name="Send" className="ml-2" size={18} />
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Phone" className="text-primary" size={24} />
                    Телефон
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold">+7 (800) 555-35-35</p>
                  <p className="text-sm text-muted-foreground">Звонок бесплатный по России</p>
                </CardContent>
              </Card>

              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Mail" className="text-primary" size={24} />
                    Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold">info@aerovector.ru</p>
                </CardContent>
              </Card>

              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="MapPin" className="text-primary" size={24} />
                    Адрес
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold">г. Краснодар</p>
                  <p className="text-sm text-muted-foreground">ул. Красная, д. 154, офис 301</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-green-800 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Plane" size={32} />
                <span className="text-2xl font-bold">АэроВектор</span>
              </div>
              <p className="text-green-100">
                Передовые технологии точного земледелия для эффективного и экологичного сельского хозяйства
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Быстрые ссылки</h3>
              <div className="space-y-2">
                {['services', 'technology', 'calculator', 'about', 'blog'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className="block text-green-100 hover:text-white transition-colors"
                  >
                    {section === 'services' && 'Услуги'}
                    {section === 'technology' && 'Технология'}
                    {section === 'calculator' && 'Калькулятор'}
                    {section === 'about' && 'О компании'}
                    {section === 'blog' && 'Блог'}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Контакты</h3>
              <div className="space-y-3 text-green-100">
                <div className="flex items-center gap-2">
                  <Icon name="Phone" size={18} />
                  <span>+7 (800) 555-35-35</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Mail" size={18} />
                  <span>info@aerovector.ru</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="MapPin" size={18} />
                  <span>г. Краснодар, ул. Красная, 154</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-green-700 pt-8 text-center text-green-100">
            <p>&copy; 2024 ООО "АэроВектор". Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}