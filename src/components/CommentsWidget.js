import React, { useState } from 'react';

const CommentsWidget = () => {

  function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [key, value] = cookie.split('=');
      if (key === name) {
        return decodeURIComponent(value);
      }
    }
    return null;
  }

  // Stany kontrolowane dla formularza
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [content, setContent] = useState('');
  const [stars, setStars] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Twoja opinia trafiła do moderacji.');
    setName('');
    setAge('');
    setContent('');
    setStars(5);
  }

  return (
    <div className="comments">
      <h1>Opinie (27) -  średnia ⭐⭐⭐⭐⭐ -  5/5</h1>

      <div className="singleComment">
    <p className="content">
      Pracowałem jako programista, ale praca w IT nie sprawiała mi przyjemności ... Kurs pokazał mi wszystko od A do Z czyli faktycznie od zera. Po czterech miesiącach mam dochód wyższy niż mój kierownik.
    </p>
    <p className="signature">Jacek 28 lat ⭐⭐⭐⭐⭐</p>
  </div>

  <div className="singleComment">
    <p className="content">
      Zaczęłam kurs jako mama na urlopie wychowawczym. Po 3 tygodniach miałam pierwsze zlecenia. Dziś mam kilku stałych klientów, pracuję zdalnie, z domu, wychowując dzieci.
    </p>
    <p className="signature">Marta 30 lat ⭐⭐⭐⭐⭐</p>
  </div>

  <div className="singleComment">
    <p className="content">
      Dzięki temu kursowi mam konkretny zawód. Po 3 tygodniach od ukończenia dostałam pierwszą pracę. Dziś nie wyobrażam sobie wracać do starej pracy. Tym bardziej że przeszłam na pracę zdalną. Prowadzący kurs super tłumaczy. Polecam.
    </p>
    <p className="signature">Joanna 22 lata ⭐⭐⭐⭐⭐</p>
  </div>

  <div className="singleComment">
    <p className="content">
      Pracowałam w gastronomii. Po 6 tygodniach po ukończeniu wszystkich 3 szkoleń dostałam pierwszą pracę w TSL. Zarabiam więcej niż w poprzedniej pracy i mam możliwości rozwoju.
    </p>
    <p className="signature">Anna 27 lat ⭐⭐⭐⭐⭐</p>
  </div>

  <div className="singleComment">
    <p className="content">
      Mam 57 lat i po 30 latach w handlu myślałem, że na zmianę pracy jest za późno. Te kursy dały mi konkretny plan: wartościowe materiały w modułach, prawdziwe ćwiczenia, realne sytuacje pokazane w kursach. Dostałem robotę w spedycji. Wiek nie przeszkadza, gdy potrafisz dowieźć wyniki.
    </p>
    <p className="signature">Marek 57 lat ⭐⭐⭐⭐⭐</p>
  </div>

  <div className="singleComment">
    <p className="content">
      Chcę polecić szkolenia spedytorskie w spedytorszkolenia.pl
    </p>
    <p className="signature">Marianna 25 lat ⭐⭐⭐⭐⭐</p>
  </div>

  <div className="singleComment">
    <p className="content">
      Dużo ćwiczeń i quizów praktycznych - to mi się podoba.
    </p>
    <p className="signature">Roma 28 lat ⭐⭐⭐⭐⭐</p>
  </div>

  <div className="singleComment">
    <p className="content">
      Na początku obawiałem się że nie poradzę sobie w tym zawodzie. Pracę dostałem 5 dni po ukończeniu kursu i jednak udało mi się to osiągnąć. Jestem spedytorem. Dziękuję że na was trafiłem.
    </p>
    <p className="signature">Józef 33 lat ⭐⭐⭐⭐⭐</p>
  </div>

  <div className="singleComment">
    <p className="content">
      Wychowuję dziecko i jestem w stanie pogodzić pracę zdalną z opieką nad maluchem. Szybko poszłam na rozmowę kwalifikacyjną którą przeszłam pozytywnie. Pracuję jako freelancer. Polecam szkolenia na spedytora.
    </p>
    <p className="signature">Klaudia 29 lat ⭐⭐⭐⭐⭐</p>
  </div>

  <div className="singleComment">
    <p className="content">
      Szukałem jakiejś wiedzy o stawkach w transporcie - kurs przystępnie to przedstawia.
    </p>
    <p className="signature">Grzegorz 35 lat ⭐⭐⭐⭐⭐</p>
  </div>

  <div className="singleComment">
    <p className="content">
      Zero doświadczenia i znajomości w branży. Zrobiłem kursy, zastosowałem się do wskazówek, satysfakcja i wynik sam się pojawił. Obecnie pracuję w spedycji międzynarodowej i planuję awans. Polecam wszystkim.
    </p>
    <p className="signature">Artur 32 lat ⭐⭐⭐⭐⭐</p>
  </div>

  <div className="singleComment">
    <p className="content">
      Pan Wiśniewski potrafi zarazić entuzjazmem do zawodu. Fenomenalne kursy. Wszystko wyjaśnione bardzo łopatologicznie. O takie coś mi chodziło szukając szkoleń.
    </p>
    <p className="signature">Piotr 49 lat ⭐⭐⭐⭐⭐</p>
  </div>

  <div className="singleComment">
    <p className="content">
      Polecam
    </p>
    <p className="signature">Wojtek 40 lat ⭐⭐⭐⭐⭐</p>
  </div>

  <div className="singleComment">
    <p className="content">
      Kurs bardzo merytoryczny. Wiedza na najwyższym poziomie.
    </p>
    <p className="signature">Agata 20 lat ⭐⭐⭐⭐⭐</p>
  </div>

  <div className="singleComment">
    <p className="content">
      Jestem managerem w firmie transportowej i szukałem kursów dla nowych pracowników. Polecam bo właśnie taką wiedzę chciałem przekazać wdrażanym pracownikom.
    </p>
    <p className="signature">Andrzej 35 lat ⭐⭐⭐⭐⭐</p>
  </div>

  <div className="singleComment">
    <p className="content">
      Próbowałem zarabiać na handlu mianowicie dropshipping a wszyscy dookoła mieli konkretne zawody - też chciałem robić coś konkretnego zamiast ciągle się frustrować. Spedycja okazała się strzałem w dziesiątkę. Dziś zarabiam bardzo fajne pieniądze w małym mieście 50km od Wrocławia. Myślę że wkrótce spełnię moje marzenie o przeprowadzce do Wrocławia bo zawsze chciałem wyrwać się z prowincji. A co do kursów u Pana - są bardzo konkretne, wiedza którą dostałem rzeczywiście procentuje. Wreszcie zarabiam tyle że stać mnie na to żeby coś odłożyć na mieszkanie i to 90% tego to Pana zasługa. Dziękuję i życzę wszystkiego dobrego.
    </p>
    <p className="signature">Wiktor 25 lat ⭐⭐⭐⭐⭐</p>
  </div>

  <div className="singleComment">
    <p className="content">
      Ukończyłem szkołę kontaktów szczególnie fajne moduły to te o outscraper i google maps. Teraz robię kurs zlecenie spedycyjne krok po kroku.
    </p>
    <p className="signature">Jarek 30 lat ⭐⭐⭐⭐⭐</p>
  </div>

  <div className="singleComment">
    <p className="content">
      Polecam ! :)
    </p>
    <p className="signature">Barbara 27 lat ⭐⭐⭐⭐⭐</p>
  </div>

  <div className="singleComment">
    <p className="content">
      Kurs łączy fajnie teorię z praktycznymi ćwiczeniami i quizami to jest w nim najfajniejsze.
    </p>
    <p className="signature">Robert 20 lat ⭐⭐⭐⭐⭐</p>
  </div>

  <div className="singleComment">
    <p className="content">
      Byłem ochroniarzem w supermarkecie chciałem czegoś ambitniejszego i więcej zarabiać, dzięki temu szkoleniu mam dziś pracę jako spedytor i zarabiam 4 razy więcej niż na ochronie.
    </p>
    <p className="signature">Jacek 27 lat ⭐⭐⭐⭐⭐</p>
  </div>

  <div className="singleComment">
    <p className="content">
      Wkońcu ktoś wytłumaczył mi w przystępny sposób o czasie pracy kierowców
    </p>
    <p className="signature">Jan 25 lat ⭐⭐⭐⭐⭐</p>
  </div>

  <div className="singleComment">
    <p className="content">
      Jestem z Torunia i próbowałem znaleźć pracę w większym mieście (Bydgoszczy) bo myślałem że w moim mieście nie ma za dobrych firm transportowych. Odrzucali mnie bo nie miałem wiedzy. Aż trafiłem na szkolenia (spedytorszkolenia.pl) i okazało się że mnie przyjęli (w moim mieście). Mam zupełnie inną jakość wiedzy po tych kursach. Uczyłem się na początku tylko z książek o spedycji ale jak widać ta wiedza była do [usunięte przez administratora]. Jednak zdecydowałem się na kursy na tej stronie i okazało się że rzeczy których myślałem że douczę się w pracy - nauczyłem się tutaj. Zdobyłem wiedzę która pozwoliła mi zdobyć pierwszą pracę w moim mieście. Nie szukajcie wiedzy z książek bo to teoretyczny bełkot, natomiast solidny kurs online który jest przekazywany ludzkim językiem jak na tej platformie da wam kilka kroków przed konkurentami na rozmowach o pracę. Dzisiaj mam spoko kaskę i jestem zadowolony.
    </p>
    <p className="signature">Rafał 22 lat ⭐⭐⭐⭐⭐</p>
  </div>

  <div className="singleComment">
    <p className="content">
      100% fajne kursy &lt;3
    </p>
    <p className="signature">Daria 29 lat ⭐⭐⭐⭐⭐</p>
  </div>

  <div className="singleComment">
    <p className="content">
      Kurs szkoła kontaktów jest poprostu fenomenalny. Zdefiniujesz idealną buyer personę, wybierzesz kanały pozyskania klienta i przygotujesz jakościową ofertę, która otwiera drzwi do rozmowy. Potrafię uruchamiać prospecting, prowadzić pierwsze rozmowy według prostego skryptu, pozyskiwać leady i domykać płatnego klienta.
    </p>
    <p className="signature">Darek 40 lat ⭐⭐⭐⭐⭐</p>
  </div>

  <div className="singleComment">
    <p className="content">
      Byłam krawcową interes nie szedł kompletnie. Gdy usłyszałam o zawodzie spedytora nie wiedziałam kompletnie co to jest. Ale przekonał mnie znajomy który mi o tej pracy powiedział że warto. Porzuciłam krawiectwo i dzięki szkoleniom z tej strony wystartowałam w pracy jako spedytor. Nie żałuję tej decyzji. Żałuję tylko że tak późno się przekwalifikowałam.
    </p>
    <p className="signature">Maria 30 lat ⭐⭐⭐⭐⭐</p>
  </div>

  <div className="singleComment">
    <p className="content">
      Polecam kurs zlecenie spedycyjne krok po kroku pozwla rozłożyć zlecenie na czytelne elementy i poprowadzić operację bez wpadek, zabezpieczając obowiązki i odpowiedzialność stron. Pozwala poczuć się jak w pracy. Takiego szkolenia właśnie szukałem.
    </p>
    <p className="signature">Nikolas 34 lat ⭐⭐⭐⭐⭐</p>
  </div>

  <div className="singleComment">
    <p className="content">
      Potrafię dobrać właściwy typ pojazdu do ładunku i miejsca, potwierdzać dostępność i podstawiać auto, które spełniło wymagania bez improwizacji. Polecam
    </p>
    <p className="signature">Jacek 27 lat ⭐⭐⭐⭐⭐</p>
  </div>

      {/* Wszystkie istniejące komentarze pozostają bez zmian */}

      <h1>Dodaj opinię</h1>
      {getCookie('user') ? (
        <form onSubmit={handleSubmit} className="opinionForm">
          <label>
            Twoje imię:
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </label>

          <label>
            Twój wiek:
            <input 
              type="number" 
              value={age} 
              onChange={(e) => setAge(e.target.value)} 
              required
              min="0"
            />
          </label>

          <label>
            Treść opinii:
            <textarea 
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
              required
            />
          </label>

          <label>
            Ocena:
            <select value={stars} onChange={(e) => setStars(Number(e.target.value))}>
              <option value={5}>⭐⭐⭐⭐⭐</option>
              <option value={4}>⭐⭐⭐⭐</option>
              <option value={3}>⭐⭐⭐</option>
              <option value={2}>⭐⭐</option>
              <option value={1}>⭐</option>
            </select>
          </label>

          <button type="submit">Dodaj opinię</button>
        </form>
      ) : (
        <p>Aby dodać opinię musisz być zalogowany. Jeśli jesteś zalogowany i nie widzisz formularza dodawania opinii - odśwież stronę.</p>
      )}
    </div>
  );
}

export default CommentsWidget;


