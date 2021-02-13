
(function($){
    'use strict';
    //Отдельном выносим языки, для более простой локализации
    var Lang = {
        ru: {
            //Месяца
            months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            //Месяца в родительcком падеже
            monthsRp: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
            //Месяца в предложном падеже
            monthsPp: ['январе', 'феврале', 'марте', 'апреле', 'мае', 'июне', 'июле', 'августе', 'сентябре', 'октябре', 'ноябре', 'декабре'],
            maxPurchase: 'Больше всего заказов (_COUNT_) было _DATE_ _MONTH_ 2015 года.',
            stockInfoTitle: 'Более 100 000 продаж в ',
            stockInfoTime: 'Сроки проведения акции с _STARTDATE_ _STARTMONTH_ по _ENDDATE_ _ENDMONTH_'
        },
        ro: {
            months: ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'],
            monthsRp: ['ianuarie', 'februarie', 'martie', 'aprilie', 'mai', 'iunie', 'iulie', 'august', 'septembrie', 'octombrie', 'noiembrie', 'decembrie'],
            monthsPp: ['ianuarie', 'februarie', 'martie', 'aprilie', 'mai', 'iunie', 'iulie', 'august', 'septembrie', 'octombrie', 'noiembrie', 'decembrie'],
            maxPurchase: 'Cele mai multe comenzi (_COUNT_) au fost pe _DATE_ _MONTH_ 2015.',
            stockInfoTitle: 'Mai mult de 100 000 de vânzări în ',
            stockInfoTime: 'Perioada promoţiei: de pe _STARTDATE_ _STARTMONTH_ până pe _ENDDATE_ _ENDMONTH_'
        }
    };

    //Объявляем класс нашего лендинга
    var Landing = function () {

        this.nowDate = new Date();

        //Параметры загрузки лендинга
        this.params = {
            lang: 'ro', //локализация
            maxPurchase: 2419, //Максимальное кол-во покупок
            maxPurchaseDate: 2, //Количество дней назад
            startStockDate: 29, //Дней назад началась акция
            endStockDate: 1, //Дней через которые акция закончится
            countDownDiff: Math.ceil((24*60*60)-(this.nowDate.getHours() * 60 * 60 + this.nowDate.getMinutes() * 60 + this.nowDate.getSeconds())), //Количество секунд до конца таймера
            selectors: {
                countDown: '.landing__countdown', //Таймер
                maxPurcahesDate: '.landing__maxpurcashe', //Максимальное кол-во покупок
                stockInfo: '.landing__stockinfo',
                stockInfoTitle: '.landing__stockinfo_title'
            }
        };

        //Стартуем таймер

        //Заполняем обман
        //Максимальное количество покупок
        this.initMaxPurcasheDate();
        //Даты проведения акции
        this.initStockInfo();

        this.initEvents();
    };
    //Список ивентов лендинга
    Landing.prototype.initEvents = function() {
        this.removeStyleTag();
        this.params.lang = 'ro';
        $('.scrollto').on('click', this.scrollToForm);
        $("#ouibounce-modal .modal-footer, .close-over").on("click", this.closeWarningModal);
    };

    //Информация о дате проведения лендингов
    Landing.prototype.initStockInfo = function() {
        var lang = Lang[this.params.lang];
        var stockTitle = lang.stockInfoTitle + lang.monthsPp[this.nowDate.getUTCMonth()];


        var endStockDate = new Date(this.nowDate.getTime() + (this.params.endStockDate*24*60*60*1000));
        var startStockDate = new Date(this.nowDate.getTime() - (this.params.startStockDate*24*60*60*1000));

        var stockInfo = lang.stockInfoTime;
        stockInfo = stockInfo.replace('_STARTDATE_', startStockDate.getUTCDate());
        stockInfo = stockInfo.replace('_ENDDATE_', endStockDate.getUTCDate());
        stockInfo = stockInfo.replace('_STARTMONTH_', lang.monthsRp[startStockDate.getMonth()]);
        stockInfo = stockInfo.replace('_ENDMONTH_', lang.monthsRp[endStockDate.getMonth()]);

        $(this.params.selectors.stockInfoTitle).html(stockTitle);
        $(this.params.selectors.stockInfo).html(stockInfo);
    };

    //Максимальное количество покупок
    Landing.prototype.initMaxPurcasheDate = function() {
        var maxPurchaseDate = new Date(this.nowDate.getTime() - (this.params.maxPurchaseDate*24*60*60*1000));
        var htmlString = Lang[this.params.lang].maxPurchase;
        htmlString = htmlString.replace('_COUNT_', this.params.maxPurchase);
        htmlString = htmlString.replace('_DATE_', maxPurchaseDate.getUTCDate());
        htmlString = htmlString.replace('_MONTH_', Lang[this.params.lang].monthsRp[maxPurchaseDate.getUTCMonth()]);

        $(this.params.selectors.maxPurcahesDate).html(htmlString);
    };

    Landing.prototype.removeStyleTag = function(event) {
        $(document.head).find('style').remove();
    };

    Landing.prototype.scrollToForm = function(event) {
        var $target = $(event.currentTarget);

        $("body,html").animate({
            scrollTop: $($target.attr("href")).offset().top
        }, 1e3);
        event.preventDefault();
    };

    $(function() {
        window.landing = new Landing();
    });
})(jQuery);

$(document).ready(function(){
    $('a.scrollto').click(function(){

        $("html, body").animate({scrollTop: $("form").offset().top-300}, 1000);

        event.preventDefault();

    });

    var _currentDate = new Date();
    var count = 30; // 8 hours
    var _toDate = new Date(_currentDate.getFullYear(), _currentDate.getMonth(), _currentDate.getDate(), _currentDate.getHours(), _currentDate.getMinutes() + count, 1);

 

    var scrollTop = localStorage.getItem('offsetTop');
    $(window).scrollTop(scrollTop);
    localStorage.setItem('offsetTop', 0);
    $('select').on('change', function () {
        var offsetTop = $(this).offset();
        offsetTop = offsetTop.top - 100;
        localStorage.setItem('offsetTop', offsetTop);
        location.href = '/?country_code=' + $(this).val();
    });
});

/*LOCALIZATION VARAIBLES*/
var countryCodeLocation = "RO"; // "RU", "UA", "RO", "TL"

var nameList,
    madeOrderOnSum,
    wasOrdered,
    left,
    shared,
    usersOnline,
    orderedCallback,
    packsLeft,
    codeEmpty,
    codeOk,
    codeWrong,
    packName,
    discountPack,
    leftSingle,
    oneDollarPacktext,
    strarSign,
    allready,
    peopleGotForOneDollar,
    madeOrderOnCount;

/* END LOCALIZATION VARAIBLES*/


/* Общие настройки */

var productQuantity = 60; // Желательно > 50.

var intervalTime = 22000; // Задержка папапов.
var mobileFormBreakPoint = 767; //В случае наличия разыных форм для мобилы и десктопа - тут можно указать разрешение, на котором форма будет меняться.



var genderNames = 'both'; // 'men' если нужны только мужские имена. или 'women' если только женские. или 'both' если и те и те.


/*Теги для попапов заказов*/

var tagOnlineStart = '<div><i class="everad-sprite everad-sprite-online_user"></i><span>';
var tagCartStart = '<div><i class="everad-sprite everad-sprite-bucket"></i><span>';
var tagCallBackStart = '<div><i class="everad-sprite everad-sprite-callback"></i><span>';
var tagStartSpan = '<span>';
var tagEndSpan = '</span>';
var tagEndDivAndSpan = '</span></div>';
var tagBlinkSpan = '<span class="blink_me">';
var tagBlinkAnim = '<span class="blink">';

/*Конец тегов*/


/*Включатели функций*/

var modalsClone = true; // клонирование модалок с формой.
var orderPopups = true; // всплывающие попапы с заказами.
var checkCode = true;
var todaySold = true; // #todayBay -wrap

var localization = {
    RU: {
        men: [
            'Валерий Фе****',
            'Владислав Ко****',
            'Владимир Ма****',
            'Валентин Ди****',
            'Валерий Ще******',
            'Иван Ба*****',
            'Вячеслав Ку****',
            'Михаил Ро*****',
            'Сергей Во*****',
            'Дмитрий Де*****',
            'Вячеслав Шу****',
            'Дима Ав*****',
            'Денис Ми***',
            'Евгений Ма*****',
            'Виталий Ми****',
            'Даниил Те*****',
            'Влад Бу*****',
            'Иван Гр*****',
            'Алексей Ре*****',
            'Владимир Су****',
            'Вадим Тр*****',
            'Вадим Га*****',
            'Евгений Го****',
            'Евгений Ба****',
            'Сергей Жу***',
            'Влад Че*****',
            'Владислав Ни****',
            'Виктор Че*****',
            'Олег Як*****',
            'Дмитрий Гл*****',
            'Василий Кр****',
            'Антон За****',
            'Антон Бе****',
            'Илья Со****',
            'Сергей Ми****',
            'Дмитрий Да****',
            'Владислав Ра****',
            'Дмитрий Вл*****',
            'Иван Ма*****',
            'Павел Пр*****',
            'Никита Ки****',
            'Максим Ша*****',
            'Ярослав Ко****',
            'Илья См*****',
            'Андрей Ле****',
            'Андрей Ни*****',
            'Артём Ре****',
            'Анатолий Ти*****',
            'Ярослав За*****',
            'Василий Гу****'
        ],
        women: [
            'Анна Па*****',
            'Алина Ер*****',
            'Александра Ло****',
            'Елена Бы****',
            'Марина Ел****',
            'Анна Мо****',
            'Ксения Кр*****',
            'Алена Бо****',
            'Виктория Ка****',
            'Маргарита Бе****',
            'Анна Ры*****',
            'Дарья Са*****',
            'Алла Кр*****',
            'Евгения Ко****',
            'Антонина Пе****',
            'Ирина Со****',
            'Алена Во****',
            'Валентина Бу****',
            'Вика Др****',
            'Валерия Ло****',
            'Кристина Со****',
            'Наталья Го*****',
            'Марина Ма*****',
            'Катерина Ля****',
            'Анастасия Ле*****',
            'Екатерина Во*****',
            'Наталья Ло****',
            'Валентина Ля****',
            'Вероника Ан****',
            'Викуся Пр*****',
            'Мария Ша****',
            'Василиса Ма****',
            'Ольга Дм****',
            'Виктория Ни****',
            'Дарья Пе****',
            'Татьяна Ко****',
            'Валентина Ко****',
            'Оля Са******',
            'Лилия Ма*****',
            'Ирина Пе*****',
            'Анна Да*******',
            'Анастасия Во****',
            'Полина Гр****',
            'Мария Ко****',
            'Кристина До****',
            'Юлия Пу****',
            'Татьяна Ла****',
            'Валерия Лу****',
            'Анастасия Шп****',
            'Алёна Ши****'
        ],
        beforenametext: '',
        madeOrderOnSum: ', сделал(а) заказ на сумму ',
        wasOrdered: ', заказано ',
        left: ' Осталось упаковок',
        shared: ' по акции ',
        usersOnline: 'Количество посетителей на сайте: ',
        orderedCallback: ', сделал(а) заявку на обратный звонок',
        packsLeft: 'Осталось упаковок по акции ',
        codeEmpty: 'Введите, пожалуйста, код.',
        codeOk: 'Данный код верен. Cпасибо, что выбрали нашу продукцию!',
        codeWrong: 'К сожалению, данный код не найден! Вероятнее всего, вы приобрели поддельный продукт.',
        packName: ' шт.',
        discountPack: ' акционных упаковок. ',
        leftSingle: 'Осталось ',
        oneDollarPacktext: '"Цена со скидкой 1&nbsp',
        strarSign: '*" ',
        allready: 'Уже ',
        peopleGotForOneDollar: ' человек получили упаковку за 1 ',
        madeOrderOnCount: ', сделал(а) заказ на '
    },
    UA: {
        men: [
            'Валерій Фе****',
            'Владислав Ко****',
            'Володимир Ма****',
            'Валентин Ди****',
            'Валерій Ще******',
            'Іван Ба*****',
            'Ярослав Ку****',
            'Михайло Ро*****',
            'Сергій Во*****',
            'Дмитро Де*****',
            'Олег Шу****',
            'Діма Ав*****',
            'Денис Ми***',
            'Євгеній Ма*****',
            'Виталій Ми****',
            'Данило Те*****',
            'Влад Бу*****',
            'Іван Гр*****',
            'Олексій Ре*****',
            'Володимир Су****',
            'Вадим Тр*****',
            'Вадим Га*****',
            'Євгеній Го****',
            'Євгеній Ба****',
            'Сергій Жу***',
            'Влад Че*****',
            'Владислав Ни****',
            'Віктор Че*****',
            'Олег Як*****',
            'Дмитро Гл*****',
            'Василь Кр****',
            'Антон За****',
            'Антон Бе****',
            'Ілля Со****',
            'Сергій Ми****',
            'Дмитро Да****',
            'Владислав Ра****',
            'Дмитро Вл*****',
            'Іван Ма*****',
            'Павло Пр*****',
            'Нікіта Ки****',
            'Максим Ша*****',
            'Ярослав Ко****',
            'Ілля См*****',
            'Андрій Ле****',
            'Андрій Ни*****',
            'Артем Ре****',
            'Анатолій Ти*****',
            'Ярослав За*****',
            'Василь Гу****'
        ],

        women: [
            'Анна Па*****',
            'Аліна Ер*****',
            'Олександра Ло****',
            'Олена Би****',
            'Марина Мі****',
            'Анна Мо****',
            'Ксенія Кр*****',
            'Олена Бо****',
            'Віктория Ка****',
            'Маргарита Бе****',
            'Анна Ри*****',
            'Дарина Са*****',
            'Алла Кр*****',
            'Євгенія Ко****',
            'Антоніна Пе****',
            'Ірина Со****',
            'Олена Во****',
            'Валентина Бу****',
            'Віка Др****',
            'Валерія Ло****',
            'Христина Со****',
            'Наталя Го*****',
            'Марина Ма*****',
            'Катерина Ля****',
            'Анастасія Ле*****',
            'Катерина Во*****',
            'Наталя Ло****',
            'Валентина Ля****',
            'Вероніка Ан****',
            'Вікуся Пр*****',
            'Марія Ша****',
            'Василіса Ма****',
            'Ольга Дм****',
            'Вікторя Ни****',
            'Дарина Пе****',
            'Тетяна Ко****',
            'Валентина Ко****',
            'Оля Са******',
            'Лілія Ма*****',
            'Ірина Пе*****',
            'Анна Да*******',
            'Анастасія Во****',
            'Поліна Гр****',
            'Марія Ко****',
            'Христина До****',
            'Юлія Пу****',
            'Тетяна Ла****',
            'Валерія Лу****',
            'Анастасія Шп****',
            'Олена Ши****'
        ],

        beforenametext: '',
        madeOrderOnSum: ', зробив(ла) замовлення на суму ',
        wasOrdered: ', замовлено ',
        left: ' Залишилось упаковок',
        shared: ' по акції ',
        usersOnline: 'Кількість відвідувачів на сайті: ',
        orderedCallback: ', зробив(ла) заявку на зворотній дзвінок',
        packsLeft: 'Залишилось упаковок по акції',
        codeEmpty: 'Введіть, будь ласка, код.',
        codeOk: 'Даний код вірний. Дякуємо, що вибрали нашу продукцію!',
        codeWrong: 'На жаль, даний код не знайдений! Найімовірніше, ви придбали підроблений продукт.',
        packName: ' шт.',
        discountPack: ' акційних упаковок. ',
        leftSingle: 'Залишилось ',
        oneDollarPacktext: '"Ціна зі знижкою 1&nbsp',
        strarSign: '*" ',
        allready: 'Вже ',
        peopleGotForOneDollar: ' людей отримали упаковку за 1 ',
        madeOrderOnCount: ', зробив(ла) замовлення на '
    },
    TL: {
        men: [
            'Nampong Nakorn',
            'Natwatcharaphon Samrong',
            'Atthophol Rostham',
            'Whatcharakorn Sonnuwat',
            'Sorrasak Tujinda',
            'Weerasuk Chimi Permphasook',
            'Phunaphot Ketlekha',
            'Phimrawi Ditthaneat',
            'Chayaphon Purathane',
            'Tik Jung',
            'Nuttapol Chuasart',
            'Passakon Yangsouy',
            'Wuthiphan Jojo Ungkubkeaw',
            'Jakkit Prachompol',
            'Khanong Yotarat',
            'Soisakul Paitoon',
            'Abhithan Limboriboon',
            'Siriphong Kasiphochana',
            'Apichat Daengkongkho',
            'Molakrai Wanachai',
            'Attapon Pantu',
            'Chalit Laknoy',
            'Aeknarin Reuangsamut',
            'Warayut Chaninsi',
            'Turbohuahin Rattananakin',
            'Ratithon Mark Chankomol',
            'Kriengkrai Wongngernpet',
            'Sanit Nitld Supjarussang',
            'Rungsun Meeprasart',
            'Somchai Paithumsut'
        ],
        women: [
            'Kantima Juicharoen',
            'Kawinthip Chanthaniyom',
            'Tippawan Lasonti',
            'Thanyathip Srisanyos',
            'Sunantha Phansawat',
            'Parngporn Chainarong',
            'Chaninrat Thongsri',
            'Watchara Imjai',
            'Panita Sornthian',
            'Warangkana Wongchompoo',
            'Baifern Natthaphatsorn',
            'Natchaya Wirojwatanakul',
            'Thidathip Noosing',
            'Vimwipa Klaviggarn',
            'Sasisumon Yangchumchuen',
            'Wilawan Kitcharoenwong',
            'Phachara Num Phusudsung',
            'Aew Junjira',
            'Trairat Wittayapreechaku',
            'Jantira Jamjaroen',
            'Saitharn Prasansee',
            'Aomaom Panisara Onnim',
            'Tripaporn Jantarawijit',
            'Numpeung Hongsakun',
            'Patcharadanai Kaewprasaet',
            'Roongnapa Pungpun',
            'Maneerat Manosansophon',
            'Phetcharat Charayut',
            'Rinrada Pairot',
            'Sudaporn Sonthong'
        ],
        beforenametext: 'คุณ ',
        madeOrderOnSum: ' ได้สั่งสินค้าเป็นจำนวนเงิน ',
        wasOrdered: ' สั่งซื้อเรียบร้อยแล้ว ',
        left: ' มีสินค้าโปรโมชั่นเหลือ ',
        shared: ' กล่อง ',
        usersOnline: 'จำนวนผู้เข้าชมเวปไซต์ ',
        orderedCallback: ' แจ้งให้เจ้าหน้าที่ติดต่อกลับเรียบร้อยแล้ว',
        packsLeft: 'มีสินค้าโปรโมชั่นเหลือ ',
        codeEmpty: 'กรุณาใส่รหัส',
        codeOk: 'รหัสสินค้าถูกต้อง ขอบคุณที่เลือกใช้ผลิตภัณฑ์ของเรา',
        codeWrong: 'ขออภัย ไม่พบรหัส เป็นไปได้ว่าสินค้าที่คุณซื้อไปอาจเป็นของปลอม',
        invalidNameText: 'กรุณาระบุชื่อที่ถูกต้อง',
        invalidPhoneText: 'กรุณาระบุหมายเลขโทรศัพท์ที่ถูกต้อง ไม่เช่นนั้นเราจะไม่สามารถติดต่อกับคุณได้',
        packName: ' กล่อง',
        discountPack: ' акционных упаковок. ',
        leftSingle: 'Осталось ',
        oneDollarPacktext: '"Цена со скидкой 1&nbsp',
        strarSign: '*" ',
        allready: 'Уже ',
        peopleGotForOneDollar: ' человек получили упаковку за 1 ',
        madeOrderOnCount: ', сделал(а) заказ на '
    },
    RO: {
        men: [
            'Stefan Ma****',
            'Brandusa Ione****',
            'Nicolae Gheor****',
            'Florin Rox****',
            'Catalin Pope****',
            'Ioan R****',
            'Adrian Constan****',
            'Mihai Cos****',
            'Dan P****',
            'Dumitru Ser****',
            'Gabriel Preoșe****',
            'Dumitru Poste****',
            'David B****',
            'Florin Namgale****',
            'Mircea Cov****',
            'Daniel O****',
            'Eugen Merin****',
            'Ioan Petr****',
            'Alexandru P****',
            'Lazar Ione****',
            'Brandușa Gheor****',
            'Dorin Merin****',
            'Eduard Ma****',
            'Neculai Mazile****',
            'Lucian Merin****',
            'Matei Pope****',
            'Gabriel Petr****',
            'Mircea Curcan****',
            'Adrian R****',
            'Dumitru Constan****',
            'Vasile S****',
            'Dorin M****',
            'Miron Brașovi****',
            'Ionuț Anghe****',
            'Iustin Cojoc****',
            'Dumitru Cojoca****',
            'Ignat Cozme****',
            'Dumitru Mi****',
            'Ioan Pe****',
            'Florentin Pope****',
            'Constantin Catar****',
            'Matei Car****',
            'Gabriel Ig****',
            'Ion Constan****',
            'Andrei Ser****',
            'Andrei Gheor****',
            'Eugen P****',
            'Brandusa Chirileanu',
            'Miron Ione****',
            'Vasile Ma****',
            'Alexandru Mazile****',
            'Gheorghe Grosu'
        ],
        women: ['Ana Pope****',
            'Floarea Mazile****',
            'Andreea Chirile****',
            'Elena Andr****',
            'Mariana Ione****',
            'Ana Mir****',
            'Marina Poste****',
            'Elena Oroș****',
            'Alina Go****',
            'Mariana Gheor****',
            'Ana Constan****',
            'Alexandra S****',
            'Cristina Ma****',
            'Ioana P****',
            'Andreea Chir****',
            'Aglaia Maco****',
            'Elena And****',
            'Georgiana ****',
            'Mihaela R****',
            'Felicia R****',
            'Carolina Munte****',
            'Horea Ser****',
            'Mariana Insura****',
            'Felicia Ione****',
            'Dana Ra****',
            'Ioana Ha****',
            'Dorina Pope****',
            'Eleonora Cu****',
            'Viorica Chirilean****',
            'Alexandra P****',
            'Maria Dimo****',
            'Viorica Timo****',
            'Ioana Paval****',
            'Aglaia Pavl****',
            'Denisa Cojoc****',
            'Doina Mo****',
            'Monica Gheor****',
            'Magda Ma****',
            'Floarea Pope****',
            'Alina Ione****',
            'Ana Mazile****',
            'Ana-Maria R****',
            'Denisa Mor****',
            'Maria Ser****',
            'Georgiana Craiove****',
            'Camelia S****',
            'Magdalena Constan****',
            'Viorica Țep****',
            'Ana-Maria Lepa****',
            'Elena B****',
        ],
        beforenametext: '',
        madeOrderOnSum: ', un ordin pentru suma de ',
        wasOrdered: ', au comandat ',
        left: 'Au ramas ',
        shared: ' pe reducere ',
        usersOnline: 'Numărul de vizitatori ai site-ului: ',
        orderedCallback: ', a făcut o cerere pentru un apel de retur',
        packsLeft: 'Au ramas cutii pe reducere ',
        codeEmpty: 'Scrieți vă rog, codul.',
        codeOk: 'Acest cod este drept. Mulțumesc că ați ales producția noastră.',
        codeWrong: 'Cu părere de rău acest cod nu poate fi găsit! Cel mai probabil, ați cumpărat un produs contrafăcut.',
        invalidNameText: 'Se specifică numele de korektno',
        invalidPhoneText: 'Introduceți numărul de telefon korektno',
        packName: ' cutii',
        discountPack: ' акционных упаковок. ',
        leftSingle: 'Осталось ',
        oneDollarPacktext: '"Цена со скидкой 1&nbsp',
        strarSign: '*" ',
        allready: 'Уже ',
        peopleGotForOneDollar: ' человек получили упаковку за 1 ',
        madeOrderOnCount: ', сделал(а) заказ на '
    }
}

/* Доп функция */
String.prototype.replaceAt = function(index, character) {
    return this.substr(0, index) + character + this.substr(index + character.length);
}

/* Добавляем звездочки */
function addStars(arr) {
    for (var i = 0; i < arr.length; i++) {
        var trimName = arr[i];
        var startStars = trimName.indexOf(' ') + 3;
        var cutStr = trimName.slice(0, startStars);
        var newItem = cutStr.replaceAt(startStars, "*****");
        arr.splice(i, 1, newItem);
    }
}

function concatMenAndWoman(arr1, arr2) {
    var concatedArray = arr1.concat(arr2);
    addStars(concatedArray);
    return concatedArray;
}

function setLocalization(localiz) {

    if (genderNames == 'men') {
        nameList = concatMenAndWoman(localization[localiz].men, []);
    } else if (genderNames == 'women') {
        nameList = concatMenAndWoman(localization[localiz].women, []);
    } else {
        nameList = concatMenAndWoman(localization[localiz].men, localization[localiz].women);
    }
    beforenametext = localization[localiz].beforenametext;
    madeOrderOnSum = localization[localiz].madeOrderOnSum;
    wasOrdered = localization[localiz].wasOrdered;
    left = localization[localiz].left;
    shared = localization[localiz].shared;
    usersOnline = localization[localiz].usersOnline;
    orderedCallback = localization[localiz].orderedCallback;
    packsLeft = localization[localiz].packsLeft;
    codeEmpty = localization[localiz].codeEmpty;
    codeOk = localization[localiz].codeOk;
    codeWrong = localization[localiz].codeWrong;
    packName = localization[localiz].packName;
    discountPack = localization[localiz].discountPack;
    leftSingle = localization[localiz].leftSingle;
    oneDollarPacktext = localization[localiz].oneDollarPacktext;
    strarSign = localization[localiz].strarSign;
    allready = localization[localiz].allready;
    peopleGotForOneDollar = localization[localiz].peopleGotForOneDollar;
    madeOrderOnCount = localization[localiz].madeOrderOnCount;
}

setLocalization(countryCodeLocation);

// Якщо потрібен вивід дати та час + хвилин, тоді до спана з датою додаємо клас "time" <span class="date-1 time"></span>.
// Працює як в порядку спадання, так і в порядку зростання.

document.addEventListener("DOMContentLoaded", Datee);

function Datee() {
    var msInDay = 86400000,
        counterLength = 90,
        months, countryName = 'ru',  // Встановлюємо мову для місяців.
        isAbbreviated = false, // Якщо потрібно скорочений варіант місяців з трьох букв, наприклад "янв", "июн" і т.д, тоді ставим TRUE.
        localDate = new Date();

    switch(countryName) {
        case 'it':  // Italy
            months = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
            break;
        case 'es':  // Spain
            months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
            break;
        case 'fr':  // France
            months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
            break;
        case 'pt':  // Portugal
            months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
            break;
        case 'de':  // Germany
            months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
            break;
        case 'bg':  // Bulgaria
            months = ['Януари', 'Февруари', 'Март', 'Април', 'Май', 'Юни', 'Юли', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември'];
            break;
        case 'pl':  // Poland
            months = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
            break;
        case 'ro':  // Romania
            months = ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'];
            break;
        case 'hu':  // Hungary (Румунія)
            months = ['Január', 'Február', 'Március', 'Április', 'Május', 'Június', 'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'];
            break;
        case 'gr':  // Greece
        case 'cy':  // Cyprus (Кіпр)
            months = ['Ιανουάριος', 'Φεβρουάριος', 'Μάρτιος', 'Απρίλιος', 'Μάιος', 'Ιούνιος', 'Ιούλιος', 'Αύγουστος', 'Σεπτέμβριος', 'Οκτώβριος', 'Νοέμβριος', 'Δεκέμβριος'];
            break;
        case 'ru':  // Russia
            months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
            break;
    }

    if (isAbbreviated) {
        for (var i = 0; i < months.length; i++) {
            months[i] = months[i].slice(0, 3).toLowerCase();  // Прибираємо ".toLowerCase()", якщо перша буква повинна бути великою.
        }
    }

    for (var counter = 0; counter < counterLength; counter++) {
        var dateClass = "date-" + counter,
            nodeList = document.getElementsByClassName(dateClass),
            date = new Date(localDate.getTime() - counter * msInDay),
            timeCounter = 0;
        timeArray = time(nodeList/*, true*/); // Розкоментувати, якщо необхідне сортування в порядку спадання.

        timeArray = timeFormat(timeArray);

        for(var i = 0; i < nodeList.length; i++) {
            var data = nodeList[i].dataset;

            if (data.format) {
                nodeList[i].innerHTML = format(date, data.format);
                // format: особливий формать для окремої дати. Додаєм як data-format="фомарт". Формати дивитись в switch'і нижче. dd - цифри, day - прописом.
                // <span class="date-1" data-format="dd month yyyy"></span> - мотає на 1 день назад і виводить цей span у вигляді "24 Липня 1995".
            } else {
                nodeList[i].innerHTML = format(date/*, "dd month yyyy"*/); // Default: dd.mm.yyyy ADD FORMAT HEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
            }
            if (/\btime\b/.test(nodeList[i].className)) {
                nodeList[i].innerHTML += " " + timeArray[timeCounter]; // Рядок для формату виводу часу.
                timeCounter++;
            }
        }
    }

    // <span clas="date-NUMBER"></span> - мотає час назад на NUMBER днів. Наприклад, <span className="date-5"></span>
    // <span clas="dateNUMBER"></span> - мотає час вперед на NUMBER днів. Наприклад, <span className="date5"></span>

    for (var counter = 0; counter < counterLength; counter++) {
        var dateClass = "date" + counter,
            nodeList = document.getElementsByClassName(dateClass),
            date = new Date(localDate.getTime() + counter * msInDay),
            timeCounter = 0;
        timeArray = time(nodeList/*, true*/); // Розкоментувати, якщо необхідне сортування в порядку спадання.

        timeArray = timeFormat(timeArray);

        for(var i = 0; i < nodeList.length; i++) {
            var data = nodeList[i].dataset;

            if (data.format) {
                nodeList[i].innerHTML = format(date, data.format);
                // format: особливий формать для окремої дати. Додаєм як data-format="фомарт". Формати дивитись в switch'і нижче. dd - цифри, day - прописом.
                // <span class="date-1" data-format="dd month yyyy"></span> - мотає на 1 день назад і виводить цей span у вигляді "24 Липня 1995".
            } else {
                nodeList[i].innerHTML = format(date/*, "dd month yyyy"*/); // Default: dd.mm.yyyy ADD FORMAT HEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
            }
        }
    }



    function time(nodeList, reverse) {
        var timeArray = [];

        for (var i = 0; i < nodeList.length; i++) {
            if (nodeList[i].className.match(/\btime\b/)) {
                timeArray.push(timeRandom());
            }
        }

        if (reverse) timeArray.sort(function(a, b) { return b - a; });
        else timeArray.sort(function(a, b) { return a - b; });

        return timeArray;
    }

    function timeRandom() {
        return Math.round(0 + Math.random() * 1440);
    }

    function timeFormat(timearray) {
        var array = [];

        for (var i = 0; i < timearray.length; i++) {
            var htemp = Math.floor(timearray[i] / 60), mtemp = timearray[i] % 60,
                hours = htemp < 10 ? "0" + htemp : htemp,
                minutes = mtemp < 10 ? "0" + mtemp : mtemp;
            array.push(hours + ":" + minutes);
        }


        return array;
    }

    function format(date, formatstring) {
        var innerDate = "",
            day = date.getDate(),
            year = date.getFullYear(),
            month = date.getMonth() + 1,
            fo = formatstring || true;

        switch (fo) {
            case "mm.dd.yyyy":
                innerDate += (month < 10) ? ("0" + month) : month;
                innerDate += ".";
                innerDate += (day < 10) ? ("0" + day) : day;
                innerDate += "." + year;
                return innerDate;

            case "dd month yyyy":
                innerDate += (day < 10) ? ("0" + day) : day;
                innerDate += " ";
                innerDate += months[month - 1];
                innerDate += " " + year;
                return innerDate;

            case "dd month":
                innerDate += (day < 10) ? ("0" + day) : day;
                innerDate += " ";
                innerDate += months[month - 1];
                return innerDate;

            case "day dd, month yyyy":
                var days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
                innerDate += days[new Date(year, month - 1, day).getDay()];
                innerDate += " ";
                innerDate += (day < 10) ? ("0" + day) : day;
                innerDate += " ";
                innerDate += months[month - 1];
                innerDate += " " + year;
                return innerDate;

            case "dd/mm/yyyy":
                innerDate += (day < 10) ? ("0" + day) : day;
                innerDate += "default.htm";
                innerDate += (month < 10) ? ("0" + month) : month;
                innerDate += "./" + year;
                return innerDate;

            case "dd-mm-yyyy":
                innerDate += (day < 10) ? ("0" + day) : day;
                innerDate += "-";
                innerDate += (month < 10) ? ("0" + month) : month;
                innerDate += "-" + year;
                return innerDate;

            default:
                innerDate += (day < 10) ? ("0" + day) : day;
                innerDate += ".";
                innerDate += (month < 10) ? ("0" + month) : month;
                innerDate += "." + year;
                return innerDate;
        }
    }
}


// еверад 4.0, с фиксом через cdn_path, для проверки на сервере
//для клонирования блока в попап используются следующие айдишники
// #cloneThis - для десктопа
// #cloneMobileThis - для мобильного (если нужно)
//брейкпоинт для переключения попапа при необходимости дефолт значение = 1000

// в случае, если мы не клонируем форму, а верстаем попап произвольно,
// то делать это необходимо в контейнере с классом .ever-popup-build
// false (показывать контейнер) / true (не показывать контейнер)

var popupBuild = true; // false/true


//.ever-popup-btn - класс для для открытия попапа

//проверка кода
//.check__field - класс для поля проверки кода
//.check__btn - класс для кнопки провеки кода
//.check__result - класс для контейнера с результатом проверки кода

//таймер
//для вывода счетчика таймера используется 3 контенера (часы, минуты, секунды)
//.hours класс для вывода часов
//.minutes класс для вывода минут
//.seconds класс для вывода секунд

console.log(window.cdn_path);



if(!window.cdn_path){

    (function () {

        function initiate() {

            var breakpoint = 999,
                desktop = document.querySelector('#cloneThis'),
                mobile = document.querySelector('#cloneMobileThis');

            if (popupBuild) {
                // в случае, если мы верстаем попап в контейнере .ever-popup-build, даное условие прячет его, если значение переменной popupBuild = true
                var style = document.createElement('style');
                style.innerHTML = '.ever-popup-build{position: fixed; opacity: 0;z-index: -1; top: 0; left: -9999px;}';
                document.querySelector('head').appendChild(style)
            }
/*
            function addPopupStyle() {
                // добавляем стили для нашего поапа
                var cont = document.createElement('style'),
                    head = document.querySelector('head');
                cont.innerHTML = '.ever-popup__body.ever-mobile{display:none}.ever-popup{position: fixed;top: 0;left: 0;width: 100%;height: 100%;background: rgba(0,0,0,.7);z-index: 111;display: none;overflow: auto;}.ever-popup__body{position: static;float: none;display: block;margin: 0 auto;width:auto}.ever-popup.show{display: block;align-items: center;}.ever-popup__inner{position: relative;margin: 0 auto;padding-top:35px}.ever-popup__close{width: 35px;height: 30px;position: absolute;cursor:pointer;top: 0;right: 0;z-index: 1;-webkit-transition: .3s; -moz-transition: .3s; -ms-transition: .3s; -o-transition: .3s; transition: .3s;}.ever-popup__close:after, .ever-popup__close:before {content: "";position: absolute;right: 0;top: 10px;width: 35px;height: 10px;background: #fff;transition: all 1s;}.ever-popup__close:after {-webkit-transform: rotate(-45deg);-ms-transform: rotate(-45deg);-o-transform: rotate(-45deg);transform: rotate(-45deg);}.ever-popup__close:before {-webkit-transform: rotate(45deg);-ms-transform: rotate(45deg);-o-transform: rotate(45deg);transform: rotate(45deg);}' +
                    '@media screen and (max-width: ' + breakpoint + 'px' + '){' +
                    '.ever-popup__body.ever-desktop{display:none}' +
                    '.ever-popup__body.ever-mobile{display:block}' +
                    '}';
                head.appendChild(cont)
            }

            function addMobilePopupStyle() {
                // добавляем стили для нашего поапа
                var cont = document.createElement('style'),
                    head = document.querySelector('head');
                cont.innerHTML = '@media screen and (max-width: ' + breakpoint + 'px' + ') {.ever-popup {position: fixed;top: 0;left: 0;width: 100%;height: 100%;background: rgba(0, 0, 0, .7);z-index: 111;display: none;overflow: auto;}.ever-popup__body {position: static;float: none;display: block;margin: 0 auto;width: auto}.ever-popup.show {display: block;align-items: center;}.ever-popup__inner {position: relative;margin: 0 auto;padding-top: 35px}.ever-popup__close {width: 35px;height: 30px;position: absolute;cursor: pointer;top: 0;right: 0;z-index: 1;-webkit-transition: .3s;-moz-transition: .3s;-ms-transition: .3s;-o-transition: .3s;transition: .3s;}.ever-popup__close:after, .ever-popup__close:before {content: "";position: absolute;right: 0;top: 10px;width: 35px;height: 10px;background: #fff;transition: all 1s;}.ever-popup__close:after {-webkit-transform: rotate(-45deg);-ms-transform: rotate(-45deg);-o-transform: rotate(-45deg);transform: rotate(-45deg);}.ever-popup__close:before {-webkit-transform: rotate(45deg);-ms-transform: rotate(45deg);-o-transform: rotate(45deg);transform: rotate(45deg);}}';
                head.appendChild(cont)
            }

            function createOverlay() {
                // создаем затемненный фон для попапа и вставляем его в разметку html
                var parent = document.createElement('div'),
                    parentInner = document.createElement('div'),
                    closeParent = document.createElement('div');

                parent.classList.add('ever-popup');
                parentInner.classList.add('ever-popup__inner');
                closeParent.classList.add('ever-popup__close');

                parent.appendChild(parentInner);
                parentInner.appendChild(closeParent);
                document.body.appendChild(parent);
            }

            function createModalBody(breakpoint) {
                // функция определяет содержимое для попапа, клонирует его содержимое, и поещает в контейнер ever-popup__body
                var parent = document.querySelector('.ever-popup__inner');

                if (desktop) {
                    var desktopClone = desktop.cloneNode(true);
                    desktopClone.classList.add('ever-popup__body');
                    desktopClone.removeAttribute('id');
                    parent.appendChild(desktopClone);
                    document.querySelector('.ever-popup .ever-popup__inner').style.width = document.querySelector('#cloneThis').offsetWidth + 'px';
                }

                if (mobile) {
                    var mobileClone = mobile.cloneNode(true);
                    if (desktopClone) {
                        desktopClone.classList.add('ever-desktop');
                    }
                    mobileClone.classList.add('ever-popup__body');
                    mobileClone.classList.add('ever-mobile');
                    mobileClone.removeAttribute('id');
                    parent.appendChild(mobileClone);
                    var mobileStyles = '.ever-desktop{display: block}.ever-mobile{display: none}@media screen and (max-width: ' + breakpoint + 'px){.ever-mobile{display: block}.ever-desktop{display: none;}}';

                    var mobileStylesContainer = document.createElement('style');
                    mobileStylesContainer.innerHTML = mobileStyles;
                    document.querySelector('head').appendChild(mobileStylesContainer)
                    document.querySelector('.ever-popup .ever-popup__inner').style.width = document.querySelector('#cloneMobileThis').offsetWidth + 'px';
                    console.log(mobile.offsetWidth)
                }
            }

            function modalPosition(screenHeight) {
                //расчет ширины и вывод ее в html, функция вызывается при загрузке страницы, а так же при ресайзе
                var container = document.querySelector('.ever-popup  .ever-popup__inner');
                if (container) {

                    var desktop = document.querySelector('#cloneThis'),
                        mobile = document.querySelector('#cloneMobileThis');


                    if (desktop) {
                        checkPosition(desktop, container, screenHeight);
                        if (window.innerWidth >= breakpoint) {
                            container.style.width = desktop.offsetWidth + 'px';
                        }
                        if(!mobile){
                            container.style.width = desktop.offsetWidth + 'px';
                        }
                    }
                    if (mobile) {
                        checkPosition(mobile, container, screenHeight);
                        if (window.innerWidth <= breakpoint) {
                            container.style.width = mobile.offsetWidth + 'px';
                        }
                    }
                }
            }

            function checkPosition(selector, container, screenHeight) {
                //позиционирование попапа по вертикали

                var cont = selector,
                    contHeight = cont.offsetHeight;

                if (contHeight > screenHeight) {
                    container.style.margin = '40px auto';
                }
                else {
                    var top = (screenHeight - contHeight) / 2;
                    container.style.margin = top + 'px auto 20px';
                }
            }

            function showPopup() {
                //функция для показа попапа
                var popup = document.querySelector('.ever-popup');
                popup.classList.add('show')
            }

            function hidePopup() {
                //функция для скрытия попапа
                var popup = document.querySelector('.ever-popup');
                popup.classList.remove('show')
            }

            function notHide(e) {
                //функция для прерывания выполнения сценария по клику
                e.stopPropagation()
            }

            function checkCode(event) {
                // проверка кода подлинности
                event.preventDefault();

                var code = document.querySelector(".check__field").value,
                    msg = document.querySelector(".check__result");

                if (code.length === 15) {
                    msg.innerHTML = 'Данный код верен. Спасибо, что выбрали нашу продукцию!';
                }
                else if (code.length === 0) {
                    msg.innerHTML = 'Введите, пожалуйста, код.';
                } else {
                    msg.innerHTML = 'К сожалению, данный код не найден! Вероятнее всего, вы приобрели поддельный продукт.';
                }
            }

            var mouseOutCount = 0;
            document.body.addEventListener('mouseleave', function (event) {
                //событие на увод мышки со страницы. если мышка уходит за верхнюю границу документа, вызывается попап
                var e = event || window.event;
                e = e.clientY;
                var popup = document.querySelector('.ever-popup');

                if (popup && e < 10 && mouseOutCount === 0) {
                    popup.classList.add('show');
                    mouseOutCount++;
                }
            });

            function addPhoneBtn(breakpoint) {
                // добавление синей трубки для вызова попапа на десктопе
                var phoneBtnContainer = document.createElement('div');
                phoneBtnContainer.classList.add('phoneBtnContainer');
                phoneBtnContainer.innerHTML = '<div class="bluePhone"><div class=" phone-call cbh-phone cbh-green cbh-show ever-popup-btn cbh-static" id="clbh_phone_div"><div class="phoneJs"><div class="cbh-ph-circle"></div><div class="cbh-ph-circle-fill"></div><div class="cbh-ph-img-circle1"></div></div></div></div>';
                document.body.appendChild(phoneBtnContainer);

                var phoneStyles = document.createElement('style');
                phoneStyles.innerHTML = '.phoneBtnContainer{position:fixed; right: 10px;bottom: 10px; visibility:hidden;background-color:transparent;width:200px;height:200px;cursor:pointer;z-index:99;-webkit-backface-visibility:hidden;-webkit-transform:translateZ(0);-webkit-transition:visibility .5s;-moz-transition:visibility .5s;-o-transition:visibility .5s;transition:visibility .5s}.cbh-phone.cbh-show{visibility:visible}@-webkit-keyframes fadeInRight{0%{opacity:0;-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}100%{opacity:1;-webkit-transform:none;transform:none}}@keyframes fadeInRight{0%{opacity:0;-webkit-transform:translate3d(100%,0,0);-ms-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}100%{opacity:1;-webkit-transform:none;-ms-transform:none;transform:none}}@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translate3d(2000px,0,0);transform:translate3d(2000px,0,0)}100%{opacity:1;-webkit-transform:none;transform:none}}@-webkit-keyframes fadeOutRight{0%{opacity:1}100%{opacity:0;-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}}@keyframes fadeOutRight{0%{opacity:1}100%{opacity:0;-webkit-transform:translate3d(100%,0,0);-ms-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}}.fadeOutRight{-webkit-animation-name:fadeOutRight;animation-name:fadeOutRight}.cbh-phone.cbh-static1{opacity:.6}.cbh-phone.cbh-hover1{opacity:1}.cbh-ph-circle{width:160px;height:160px;top:20px;left:20px;position:absolute;background-color:transparent;-webkit-border-radius:100%;-moz-border-radius:100%;border-radius:100%;border:2px solid rgba(30,30,30,.4);opacity:.1;-webkit-animation:cbh-circle-anim 1.2s infinite ease-in-out;-moz-animation:cbh-circle-anim 1.2s infinite ease-in-out;-ms-animation:cbh-circle-anim 1.2s infinite ease-in-out;-o-animation:cbh-circle-anim 1.2s infinite ease-in-out;animation:cbh-circle-anim 1.2s infinite ease-in-out;-webkit-transition:all .5s;-moz-transition:all .5s;-o-transition:all .5s;transition:all .5s}.cbh-phone.cbh-active .cbh-ph-circle1{-webkit-animation:cbh-circle-anim 1.1s infinite ease-in-out!important;-moz-animation:cbh-circle-anim 1.1s infinite ease-in-out!important;-ms-animation:cbh-circle-anim 1.1s infinite ease-in-out!important;-o-animation:cbh-circle-anim 1.1s infinite ease-in-out!important;animation:cbh-circle-anim 1.1s infinite ease-in-out!important}.cbh-phone.cbh-static .cbh-ph-circle{-webkit-animation:cbh-circle-anim 2.2s infinite ease-in-out!important;-moz-animation:cbh-circle-anim 2.2s infinite ease-in-out!important;-ms-animation:cbh-circle-anim 2.2s infinite ease-in-out!important;-o-animation:cbh-circle-anim 2.2s infinite ease-in-out!important;animation:cbh-circle-anim 2.2s infinite ease-in-out!important}.cbh-phone.cbh-hover .cbh-ph-circle{border-color:rgba(0,175,242,1);opacity:.5}.cbh-phone.cbh-green.cbh-hover .cbh-ph-circle{border-color:rgba(117,235,80,1);opacity:.5}.cbh-phone.cbh-green .cbh-ph-circle{border-color:rgba(0,175,242,1);opacity:.5}.cbh-phone.cbh-gray.cbh-hover .cbh-ph-circle{border-color:rgba(204,204,204,1);opacity:.5}.cbh-phone.cbh-gray .cbh-ph-circle{border-color:rgba(117,235,80,1);opacity:.5}.cbh-ph-circle-fill{width:100px;height:100px;top:50px;left:50px;position:absolute;background-color:#000;-webkit-border-radius:100%;-moz-border-radius:100%;border-radius:100%;border:2px solid transparent;opacity:.1;-webkit-animation:cbh-circle-fill-anim 2.3s infinite ease-in-out;-moz-animation:cbh-circle-fill-anim 2.3s infinite ease-in-out;-ms-animation:cbh-circle-fill-anim 2.3s infinite ease-in-out;-o-animation:cbh-circle-fill-anim 2.3s infinite ease-in-out;animation:cbh-circle-fill-anim 2.3s infinite ease-in-out;-webkit-transition:all .5s;-moz-transition:all .5s;-o-transition:all .5s;transition:all .5s}.cbh-phone.cbh-active .cbh-ph-circle-fill{-webkit-animation:cbh-circle-fill-anim 1.7s infinite ease-in-out!important;-moz-animation:cbh-circle-fill-anim 1.7s infinite ease-in-out!important;-ms-animation:cbh-circle-fill-anim 1.7s infinite ease-in-out!important;-o-animation:cbh-circle-fill-anim 1.7s infinite ease-in-out!important;animation:cbh-circle-fill-anim 1.7s infinite ease-in-out!important}.cbh-phone.cbh-static .cbh-ph-circle-fill{-webkit-animation:cbh-circle-fill-anim 2.3s infinite ease-in-out!important;-moz-animation:cbh-circle-fill-anim 2.3s infinite ease-in-out!important;-ms-animation:cbh-circle-fill-anim 2.3s infinite ease-in-out!important;-o-animation:cbh-circle-fill-anim 2.3s infinite ease-in-out!important;animation:cbh-circle-fill-anim 2.3s infinite ease-in-out!important;opacity:0!important} .cbh-phone.cbh-hover .cbh-ph-circle-fill{background-color:rgba(0,175,242,.5);opacity:.75!important}.cbh-phone.cbh-green.cbh-hover .cbh-ph-circle-fill{background-color:rgba(117,235,80,.5);opacity:.75!important}.cbh-phone.cbh-green .cbh-ph-circle-fill{background-color:rgba(0,175,242,.5);opacity:.75!important}.cbh-phone.cbh-gray.cbh-hover .cbh-ph-circle-fill{background-color:rgba(204,204,204,.5);opacity:.75!important}.cbh-phone.cbh-gray .cbh-ph-circle-fill{background-color:rgba(117,235,80,.5);opacity:.75!important}.cbh-ph-img-circle1{width:60px;height:60px;top:70px;left:70px;position:absolute;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABNmlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjarY6xSsNQFEDPi6LiUCsEcXB4kygotupgxqQtRRCs1SHJ1qShSmkSXl7VfoSjWwcXd7/AyVFwUPwC/0Bx6uAQIYODCJ7p3MPlcsGo2HWnYZRhEGvVbjrS9Xw5+8QMUwDQCbPUbrUOAOIkjvjB5ysC4HnTrjsN/sZ8mCoNTIDtbpSFICpA/0KnGsQYMIN+qkHcAaY6addAPAClXu4vQCnI/Q0oKdfzQXwAZs/1fDDmADPIfQUwdXSpAWpJOlJnvVMtq5ZlSbubBJE8HmU6GmRyPw4TlSaqo6MukP8HwGK+2G46cq1qWXvr/DOu58vc3o8QgFh6LFpBOFTn3yqMnd/n4sZ4GQ5vYXpStN0ruNmAheuirVahvAX34y/Axk/96FpPYgAAACBjSFJNAAB6JQAAgIMAAPn/AACA6AAAUggAARVYAAA6lwAAF2/XWh+QAAAB/ElEQVR42uya7W3CMBCG31QM4A1aNggTlG6QbpBMkHYC1AloJ4BOABuEDcgGtBOETnD9c1ERCH/lwxeaV8oPFGP86Hy+DxMREW5Bd7gRjSDSNGn4/RiAOvm8C0ZCRD5PSkQVXSr1nK/xE3mcWimA1ZV3JYBZCIO4giQANoYxMwYS6+xKY4lT5dJPreWZY+uspqSCKPYN27GJVBDXheVSQe494ksiEWTuMXcu1dld9SARxDX1OAJ4lgjy4zDnFsC076A4adEiRwAZg4hOUSpNoCsBPDGM+HqkNGynYBCuILuWj+dgWysGsNe8nwL4GsrW0m2fxZBq9rW0rNcX5MOQ9eZD8JFahcG5g/iKT671alGAYQggpYWvpEPYWrU/HDTOfeRIX0q2SL3QN4tGhZJukVobQyXYWw7WtLDKDIuM+ZSzscyCE9PCy5IttCvnZNaeiGLNHKuz8ZVh/MXTVu/1xQKmIqLEAuJ0fNo3iG5B51oSkeKnsBi/4bG9gYB/lCytU5G9DryFW+3Gm+JLwU7ehbJrwTjq4DJU8bHcVbEV9dXXqqP6uqO5e2/QZRYJpqu2IUAA4B3tXvx8hgKp05QZW6dJqrLTNkB6vrRURLRwPHqtYgkC3cLWQAcDQGGKH13FER/NATzi786+BPDNjm1dMkfjn2pGkBHkf4D8DgBJDuDHx9BN+gAAAABJRU5ErkJggg==);background-color:rgba(30,30,30,.1);background-position:center center;background-repeat:no-repeat;-webkit-border-radius:100%;-moz-border-radius:100%;border-radius:100%;border:2px solid transparent;opacity:.7;-webkit-animation:cbh-circle-img-anim 1s infinite ease-in-out;-moz-animation:cbh-circle-img-anim 1s infinite ease-in-out;-ms-animation:cbh-circle-img-anim 1s infinite ease-in-out;-o-animation:cbh-circle-img-anim 1s infinite ease-in-out;animation:cbh-circle-img-anim 1s infinite ease-in-out}.cbh-phone.cbh-active .cbh-ph-img-circle1{-webkit-animation:cbh-circle-img-anim 1s infinite ease-in-out!important;-moz-animation:cbh-circle-img-anim 1s infinite ease-in-out!important;-ms-animation:cbh-circle-img-anim 1s infinite ease-in-out!important;-o-animation:cbh-circle-img-anim 1s infinite ease-in-out!important;animation:cbh-circle-img-anim 1s infinite ease-in-out!important}.cbh-phone.cbh-static .cbh-ph-img-circle1{-webkit-animation:cbh-circle-img-anim 0s infinite ease-in-out!important;-moz-animation:cbh-circle-img-anim 0s infinite ease-in-out!important;-ms-animation:cbh-circle-img-anim 0s infinite ease-in-out!important;-o-animation:cbh-circle-img-anim 0s infinite ease-in-out!important;animation:cbh-circle-img-anim 0s infinite ease-in-out!important}.cbh-phone.cbh-hover .cbh-ph-img-circle1{background-color:rgba(0,175,242,1)}.cbh-phone.cbh-green.cbh-hover .cbh-ph-img-circle1:hover{background-color:rgba(117,235,80,1)}.cbh-phone.cbh-green .cbh-ph-img-circle1{background-color:rgba(0,175,242,1)}.cbh-phone.cbh-green .cbh-ph-img-circle1{background-color:rgba(0,175,242,1)}.cbh-phone.cbh-gray.cbh-hover .cbh-ph-img-circle1{background-color:rgba(204,204,204,1)}.cbh-phone.cbh-gray .cbh-ph-img-circle1{background-color:rgba(117,235,80,1)}@-moz-keyframes cbh-circle-anim{0%{-moz-transform:rotate(0deg) scale(0.5) skew(1deg);opacity:.1;-moz-opacity:.1;-webkit-opacity:.1;-o-opacity:.1}30%{-moz-transform:rotate(0deg) scale(.7) skew(1deg);opacity:.5;-moz-opacity:.5;-webkit-opacity:.5;-o-opacity:.5}100%{-moz-transform:rotate(0deg) scale(1) skew(1deg);opacity:.6;-moz-opacity:.6;-webkit-opacity:.6;-o-opacity:.1}}@-webkit-keyframes cbh-circle-anim{0%{-webkit-transform:rotate(0deg) scale(0.5) skew(1deg);-webkit-opacity:.1}30%{-webkit-transform:rotate(0deg) scale(.7) skew(1deg);-webkit-opacity:.5}100%{-webkit-transform:rotate(0deg) scale(1) skew(1deg);-webkit-opacity:.1}}@-o-keyframes cbh-circle-anim{0%{-o-transform:rotate(0deg) kscale(0.5) skew(1deg);-o-opacity:.1}30%{-o-transform:rotate(0deg) scale(.7) skew(1deg);-o-opacity:.5}100%{-o-transform:rotate(0deg) scale(1) skew(1deg);-o-opacity:.1}}@keyframes cbh-circle-anim{0%{transform:rotate(0deg) scale(0.5) skew(1deg);opacity:.1}30%{transform:rotate(0deg) scale(.7) skew(1deg);opacity:.5}100%{transform:rotate(0deg) scale(1) skew(1deg);opacity:.1}}@-moz-keyframes cbh-circle-fill-anim{0%{-moz-transform:rotate(0deg) scale(0.7) skew(1deg);opacity:.2}50%{-moz-transform:rotate(0deg) -moz-scale(1) skew(1deg);opacity:.2}100%{-moz-transform:rotate(0deg) scale(0.7) skew(1deg);opacity:.2}}@-webkit-keyframes cbh-circle-fill-anim{0%{-webkit-transform:rotate(0deg) scale(0.7) skew(1deg);opacity:.2}50%{-webkit-transform:rotate(0deg) scale(1) skew(1deg);opacity:.2}100%{-webkit-transform:rotate(0deg) scale(0.7) skew(1deg);opacity:.2}}@-o-keyframes cbh-circle-fill-anim{0%{-o-transform:rotate(0deg) scale(0.7) skew(1deg);opacity:.2}50%{-o-transform:rotate(0deg) scale(1) skew(1deg);opacity:.2}100%{-o-transform:rotate(0deg) scale(0.7) skew(1deg);opacity:.2}}@keyframes cbh-circle-fill-anim{0%{transform:rotate(0deg) scale(0.7) skew(1deg);opacity:.2}50%{transform:rotate(0deg) scale(1) skew(1deg);opacity:.2}100%{transform:rotate(0deg) scale(0.7) skew(1deg);opacity:.2}}@keyframes cbh-circle-img-anim{0%{transform:rotate(0deg) scale(1) skew(1deg)}10%{transform:rotate(-25deg) scale(1) skew(1deg)}20%{transform:rotate(25deg) scale(1) skew(1deg)}30%{transform:rotate(-25deg) scale(1) skew(1deg)}40%{transform:rotate(25deg) scale(1) skew(1deg)}100%,50%{transform:rotate(0deg) scale(1) skew(1deg)}}@-moz-keyframes cbh-circle-img-anim{0%{transform:rotate(0deg) scale(1) skew(1deg)}10%{-moz-transform:rotate(-25deg) scale(1) skew(1deg)}20%{-moz-transform:rotate(25deg) scale(1) skew(1deg)}30%{-moz-transform:rotate(-25deg) scale(1) skew(1deg)}40%{-moz-transform:rotate(25deg) scale(1) skew(1deg)}100%,50%{-moz-transform:rotate(0deg) scale(1) skew(1deg)}}@-webkit-keyframes cbh-circle-img-anim{0%{-webkit-transform:rotate(0deg) scale(1) skew(1deg)}10%{-webkit-transform:rotate(-25deg) scale(1) skew(1deg)}20%{-webkit-transform:rotate(25deg) scale(1) skew(1deg)}30%{-webkit-transform:rotate(-25deg) scale(1) skew(1deg)}40%{-webkit-transform:rotate(25deg) scale(1) skew(1deg)}100%,50%{-webkit-transform:rotate(0deg) scale(1) skew(1deg)}}@-o-keyframes cbh-circle-img-anim{0%{-o-transform:rotate(0deg) scale(1) skew(1deg)}10%{-o-transform:rotate(-25deg) scale(1) skew(1deg)}20%{-o-transform:rotate(25deg) scale(1) skew(1deg)}30%{-o-transform:rotate(-25deg) scale(1) skew(1deg)}40%{-o-transform:rotate(25deg) scale(1) skew(1deg)}100%,50%{-o-transform:rotate(0deg) scale(1) skew(1deg)}}.cbh-ph-img-circle1 {}.cbh-phone.cbh-green .cbh-ph-circle {border-color: rgba(0, 175, 242, 1)}.cbh-phone.cbh-green .cbh-ph-circle-fill {background-color: rgba(0, 175, 242, 1);}.cbh-phone.cbh-green .cbh-ph-img-circle1 {background-color:rgba(0, 175, 242, 1);}body, div, dl, dt, dd, ul, ol, li, nav, h1, h2, h3, h4, h5, h6, pre, code, form, fieldset, legend, input, button, textarea, p, blockquote, th, td, a {-webkit-transform-origin: center center;-ms-transform-origin: center center;-o-transform-origin: center center;transform-origin: center center;}@media screen and (max-width: ' + breakpoint + 'px) {#clbh_phone_div{display: none !important;}}';
                document.querySelector('head').appendChild(phoneStyles)
            }
*/
            function init() {

                var desktopPopup = document.querySelector('#cloneThis'),
                    mobilePopup = document.querySelector('#cloneMobileThis');

                var h = document.querySelector('.hours'), m = document.querySelector('.minutes'),
                    s = document.querySelector('.seconds');

                if (h && m && s) {
                    // если все значения (часы/минуты/секунды) сущесвтуют, тогда срабатывает таймер
                    initializeTimer();
                }
                if (desktopPopup) {
                   // createOverlay();
                   // addPopupStyle();
                   // addPhoneBtn(breakpoint);
                   // document.querySelector('.phoneBtnContainer').addEventListener('click', showPopup);
                }
                else {
                   // createOverlay();
                   // addMobilePopupStyle()
                }
                if (desktopPopup || mobilePopup) {
                    //если у нас есть #cloneThis или #cloneMobileThis, тогда все функции ниже выполняются

                    //createModalBody(breakpoint);
                    //modalPosition(window.innerHeight);
                   /* document.querySelector('.ever-popup__close').addEventListener('click', hidePopup);
                    document.querySelector('.ever-popup__inner').addEventListener('click', notHide);
                    document.querySelector('.ever-popup').addEventListener('click', hidePopup);

                    var modalBtn = document.querySelectorAll('.ever-popup-btn');
                    for (var i = 0; i < modalBtn.length; i++) {
                        modalBtn && modalBtn[i].addEventListener('click', showPopup);
                    }*/
                }
                // рабоатет если у нас есть класс .check__btn
               /* var checkBtn = document.querySelector(".check__btn");
                checkBtn && checkBtn.addEventListener('click', checkCode);*/
            }

            // при документ реди вызывается функция init, описаная выше
            document.addEventListener('DOMContentLoaded', init);

            window.addEventListener('resize', function () {
                //при ресайзе пересчитываем позиционирование модального окна
               // modalPosition(window.innerHeight);
            });

            function initializeTimer() {

                if (!localStorage.getItem("heytimer")) {
                    var time = {
                        hours: 0,
                        minutes: 27,
                        seconds: 0
                    }, different = false;

                    time = time.hours * 3600 + time.minutes * 60 + time.seconds;

                    localStorage.setItem("time", time);
                    localStorage.setItem("heytimer", true);
                    localStorage.setItem("different", different);
                }

                timerSettings();
            }

            function timerSettings() {
                var time = localStorage.getItem('time'),
                    different = localStorage.getItem('different') === "true",
                    hours = parseInt(time / 3600, 10),
                    minutes = parseInt((time - hours * 3600 ) / 60, 10),
                    seconds = parseInt(time % 60, 10);

                minutes = minutes < 10 ? "0" + minutes : "" + minutes;
                seconds = seconds < 10 ? "0" + seconds : "" + seconds;
                hours = hours < 10 ? "0" + hours : "" + hours;

                var hoursHTML = document.getElementsByClassName("hours");
                var minutesHTML = document.getElementsByClassName("minutes");
                var secondsHTML = document.getElementsByClassName("seconds");

                if (--time < 0) {
                    localStorage.removeItem("heytimer");
                    return;
                }
                if (different) {
                    seconds = seconds.split("");
                    minutes = minutes.split("");
                    hours = hours.split("");

                    doubleFilling(hoursHTML, hours);
                    doubleFilling(minutesHTML, minutes);
                    doubleFilling(secondsHTML, seconds);
                } else {
                    filling(hoursHTML, hours);
                    filling(minutesHTML, minutes);
                    filling(secondsHTML, seconds);
                }

                localStorage.setItem("time", time);
                setTimeout(timerSettings, 1000);
            }

            function filling(obj, value) {
                for (var i = 0; i < obj.length; i++) {
                    obj[i].innerHTML = value;
                }
            }

            function doubleFilling(obj, value) {
                for (var i = 0; i < obj.length; i++) {
                    obj[i].innerHTML = value[i % 2];
                }
            }
        }

        initiate();

    })();
}

