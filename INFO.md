## TECH STACK

    Next.Js, TypeScript, Tailwind, React Beautiful Dnd
    Prisma, Mongo DB

## Proje adımları

    Kanban board uygulamasında ilk etapta board alanlarını oluşturdum. Backend tarafında board oluşturma, düzenleme, silme ve ilgili boardları çağıran servisleri yazdım. Header kısmında select ile boardları listeledim, bu kısımdan boardlar arası geçişler yapabiliyoruz. Aynı zamanda burdan yeni bir board oluşturup ilgili boardu düzenleyip, silebiliyoruz.

    Sonrasında bunları takip eden Backlog, To Do, In Progress ve Done kolonlarına ait taskları oluşturdum. Backend tarafında task oluşturma, düzenleme, silme ve ilgili boardları çağıran servisleri yazdım. Taskları ilgili board ve kolonları altında listeledim. Taskları dilediğimiz gibi kolonlar arasında veya kolonlar içi sıralamada "sürükle bırak" yöntemi ile taşıyabiliyoruz. Sürükle bırak yöntemini "react-beautiful-dnd" paketi ile geliştirdim.

    İlgili servislerin model ve interface tanımlarını yaptım. Servisler prisma ile çalışıyor ve orda oluşturduğum şemayı mongo db içerisine aktardım. Backend işlemleri tümüyle prisma üzerinden ilerliyor.

    TypeScript kullanarak ilgili context, değişken ve fonksiyonların type ve interfacelerini "interfaces" klasörü içerisinde tanımladım.

    State management tarafında Context API kullandım. "context" klasörü içerisinde board, task ve home olarak gruplara ayırdım.

## Dipnot

    Mongo DB'de oluşturduğum veri tabanının kaynağını ".env" klasörü içerisinde "DATABASE_URL" değişkenine yazdım. Dilerseniz kendi db nizi oluşturup db kaynağını burdan güncelleyebilirsiniz. Eğer yeni bir db oluşturduysanız bu db yi kendi şemamızla eşleştirmek için Prisma ile çalıştığımızdan dolayı prisma içindeki şemayı ("/prisma/schema.prisma" dizininde detayları görebilirsiniz) db ye aktarabilmek için "npx prisma db push" komutunu terminalde çalıştırabilirsiniz.
