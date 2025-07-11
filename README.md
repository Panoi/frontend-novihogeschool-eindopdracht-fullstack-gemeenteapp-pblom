# Installatiehandleiding
**Deelopdracht 4 – Full-stack Developer**

---

##  Inhoudsopgave

- [Inleiding](#inleiding)
- [Functionaliteiten](#functionaliteiten)
- [Benodigdheden](#benodigdheden)
    - [Backend](#benodigdheden-backend)
    - [Frontend](#benodigdheden-frontend)
- [Gebruikte technieken](#gebruikte-technieken)
    - [Backend](#backend)
    - [Frontend](#frontend)
- [Lokaal draaien](#lokaal-draaien)
    - [Backend](#backend)
    - [Frontend](#frontend)
- [Testen](#testen)
- [Testgebruikers](#testgebruikers)

## Inleiding

De GemeenteApp is een full-stack webapplicatie waarmee inwoners voorstellen kunnen indienen en reacties kunnen achterlaten. Gemeenten hebben toegang tot de webapplicatie waarbij zij statusbehandelingen op ingediende voorstellen kunnen achterlaten zoals, “in afwachting”, “goedgekeurd” etc. Daarnaast kunnen zij ook reacties plaatsen op voorstellen. Naast inwoners en gemeenten is er een derde rol: admin. Deze heeft via de API volledige toegang tot alle data, maar binnen de frontend alleen toegang tot het aanmaken van een nieuwe gemeente. De applicatie bestaat uit een Spring Boot backend en een React frontend.

In dit document de installatiehandleiding neem ik jullie mee met de functionaliteiten, bondigdheden, gebruikte technieken, hoe je lokaal kan draaien, hoe je test kan draaien en welke testgebruikers er binnen mijn systeem beschikbaar zijn.

Link naar backend project op Github: (https://github.com/Panoi/backend-novihogeschool-eindopdracht-fullstack-gemeenteapp-pblom)
Link naar frontend project op Github: (https://github.com/Panoi/frontend-novihogeschool-eindopdracht-fullstack-gemeenteapp-pblom)

## Functionaliteiten

- Gebruikersregistratie en inloggen, inclusief JWT-authenticatie.
- Voorstel indienen inclusief het toevoegen van een foto.
- Reactie achterlaten op voorstellen binnen je eigen gemeente.
- Statusbehandelingen toekennen aan voorstellen binnen je eigen gemeente.
- Gemeente aanmaken.

## Benodigdheden

### Benodigdheden Backend

**Intellij Idea**!
Om de backendcode te kunnen bewerken en inzien is Intellij IDEA vereist. Dit is de ontwikkeling omgeving waarin dit backend project is ontwikkeld.
Intellij Idea is te verkrijgen op de website van Jetbrains: https://www.jetbrains.com/idea/

**JDK**

Om de backend optimaal te kunnen runnen is er een JDK-versie van minimaal 17 vereist, het project is ontwikkeld met JDK 21. Intellij bevat een ingebouwde JDK waardoor er niet handmatig een JDK geïnstalleerd te hoeven worden. Zo niet, kan je dat toch doen via het volgende adres: https://www.oracle.com/java/technologies/downloads/#java24

**Maven**

Daarnaast is Maven nodig om alle externe afhankelijkheden automatisch te beheren zoals, Spring Boot, Spring Security enz). Ook Maven zit standaard in Intellij geïntegreerd. Zo niet, kan je Maven alsnog handmatig installeren via het volgende adres: https://maven.apache.org/download.cgi

**POSTMAN**

Om de API handmatig te testen met JSON-verzoeken is Postman nodig. Hiermee kun je endpoints aanroepen zoals POST /proposals of GET /users. Hier wordt verder verdieping gegeven in het API-document. Postman is gratis te verkrijgen via: https://www.postman.com/downloads/

**PostgreSQL / pgAdmin**

Om toegang te krijgen in de database is PostgreSQL vereist. Je kunt hiervoor pgAdmin gebruiken. PgAdmin maakt het eenvoudig om tabellen, data en relaties te bekijken.  
Voor het gebruik van de database is minimaal PostGreSQL 10 of hoger vereist.  
PgAdmin is gratis te downloaden via: https://www.pgadmin.org/download/

### Benodigdheden frontend

**Webstorm**

Om de frontendcode te kunnen bewerken en uitvoeren is Webstorm vereist. Dit is de ontwikkelingomgeving waarin dit frontendproject is ontwikkeld. Het project is ontwikkeld met React en Vite.
Webstorm is te verkrijgen op de website van Jetbrains: https://www.jetbrains.com/webstorm/

**Node.js**

Naast webstorm maken we ook gebruik van node.js. Node.js maakt het mogelijk om de code lokaal te draaien. Bij de installatie van Node.js wordt ook NPM automatisch meegeleverd. NPM wordt gebruikt om alle afhankelijkheden te installeren. De minimale eis van Node.js is 18 of hoger.  
Node.js is gratis te downloaden via: https://nodejs.org/en/download

## Gebruikte technieken

### Backend

| Techniek                            | Omschrijving                                   | 
|-------------------------------------|------------------------------------------------|
| Spring-boot-starter-parent 3.4.4    | Hoofdframework voor de API                     |
| Spring-boot-starter-web             | Voor het gebruik van HTTP-endpoints.           |
| Spring-boot-starter-data-JPA        | Voor database interactie.                      |
| Spring-boot-starter-security        | Voor authenticatie.                            |
| postgresql                          | Maakt verbinding met postgreSQL mogelijk.      |
| Spring-boot-starter-test            | Hulpmiddel voor integratie en unittests.       |
| Spring-boot-security-test           | Voor het testen van beveiligde endpoints.      |
| Spring-boot-starter-validation      | Voor validaties zoals @NotBlank.               |
| jjwt (api, impl, jackson) 0.11.5    | Genereert een JWT-token.                       |
| Maven                               | Voor het beheren van externe afhankelijkheden. |

### Frontend

| Techniek           | Omschrijving                          |
|--------------------|---------------------------------------|
| React Router DOM   | Voor routing                          |
| React Hook Form    | Voor formulieren en validatie         |
| React-Select       | Een geavanceerde versie van selectbox |
| Axios              | Communicatie met de backend           |
| JWT-decode         | Voor het decoderen van een JWT-token  |
| React              | Voor het ontwikkelen van de frontend  |
| Vite               | Snelle ontwikkeltool                  |

## Lokaal draaien

### Backend

Om de backend lokaal te kunnen draaien moeten we een aantal stappen ondernemen, hieronder ga ik hier stap voor stap doorheen.

**Stap 1**  
Open pgAdmin en klik op postgreSQL linksboven in het scherm. PgAdmin zal om je wachtwoord vragen, vul hier je wachtwoord in en klik op inloggen.

**Stap 2**  
Vervolgens zie je aan de linkerzijde een kolom met onder anderen “databases” staan. Klik hier met je rechtermuisknop op en kies voor “create -> database”.

**Stap 3**  
Geef de database de naam `eindopdrachtfsdgemeenteapp`, zet de owner op `postgres` en klik vervolgens op “save”.

**Stap 4**  
Open Intellij en kopieer onderstaande application properties in de `application.properties`-map.  
**Let op:** op de plek `jouwwachtwoord` moet jouw eigen wachtwoord ingevuld worden.

```properties
spring.application.name=eindopdrachtfsdgeementeapp
my.upload_location=uploads

spring.datasource.url=jdbc:postgresql://localhost:5432/eindopdrachtgemeenteapp
spring.datasource.username=postgres
spring.datasource.password=jouwwachtwoord
spring.datasource.driver-class-name=org.postgresql.Driver
spring.sql.init.mode=always
spring.jpa.defer-datasource-initialization=true

spring.jpa.hibernate.ddl-auto=create
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect

logging.level.org.hibernate.SQL=DEBUG
logging.level.org.hibernate.type.descriptor.sql.BasicBinder=TRACE
spring.mvc.pathmatch.matching-strategy=ant_path_matcher

jwt.secret=MijnSuperSterkeGeheimeSleutel1234567890!ABCdef
```

**Stap 5**  
Klik op de groene pijl bovenin Intellij. De applicatie zal opstarten zonder foutmeldingen.

**Stap 6**  
Ga terug naar pgAdmin, open de database `eindopdrachtfsdgemeenteapp` door op het pijltje te klikken.  
Vervolgens open je op dezelfde manier `schemas`.  
Klik voor de zekerheid met je rechtermuisknop op `schemas` en selecteer “refresh”.  
Hierna zullen alle aangemaakte tabellen te zien zijn onder het kopje `tables`.


### Frontend

**Stap 1**  
Start Webstorm op en selecteer rechtsboven “open”.  
Webstorm zal vragen om een file te selecteren, selecteer het project: `frontend-eindopdracht-fullstack-pblom`.

**Stap 2**  
Na het openen van het project moeten we eerst een `npm install` commando uitvoeren.  
Open de terminal door op het icoontje linksonder te klikken (vierkantje met een pijl naar rechts) en voer vervolgens `npm install` in. Druk daarna op enter.

**Stap 3**  
Controleer of `VITE_API_KEY=http://localhost:8080` in de `.env`-map staat ingevuld.  
Zo niet, voeg dit dan alsnog toe in het bestand `.env`.

**Stap 4**  
Na het installeren van de afhankelijkheden kun je de frontend starten door het commando `npm run dev` uit te voeren in de terminal.

## Testen
De tests zijn te vinden in de map: `src/test/java/nl/novi/eindopdrachtfsdgeementeapp`

1. Open een van de testklassen, bijvoorbeeld `MunicipalityServiceTest` of `ProposalServiceTest`.
2. Elke testmethode bezit een annotatie met `@Test`.
3. Links naast de regel met `@Test` verschijnt een groen pijltje.
4. Klik op dit groene pijltje om de test uit te voeren.
5. Onderaan in het scherm zie je het resultaat:
    - Een **groen vinkje** betekent dat de test geslaagd is.
    - Een **rode foutmelding** betekent dat de test is mislukt.

## Testgebruikers

De GemeenteApp maakt gebruik van 3 verschillende rollen: inwoner, gemeente en admin. Elke rol heeft zo zijn eigen bevoegdheden en functionaliteiten. Zie hieronder het overzicht:

| Emailadres              | Wachtwoord | Rol      | Rechten                                                                                                                                                                                              |
|-------------------------|------------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| inwoner@gemeenteapp.nl  | wachtwoord | inwoner  | - Voorstellen indienen<br>- Reageren op voorstellen binnen eigen gemeente<br>- Inzicht in voorstellen binnen eigen gemeente<br>- Verwijderen van eigen voorstellen<br>- Aanpassen van eigen gegevens |
| inwoner2@gemeenteapp.nl | wachtwoord | inwoner  | - Voorstellen indienen<br>- Reageren op voorstellen binnen eigen gemeente<br>- Inzicht in voorstellen binnen eigen gemeente<br>- Verwijderen van eigen voorstellen<br>- Aanpassen van eigen gegevens |
| gemeente@gemeenteapp.nl | wachtwoord | gemeente | - Reageren op voorstellen binnen eigen gemeente<br>- Inzicht in voorstellen binnen eigen gemeente<br>- Statusbehandelingen aanpassen binnen eigen gemeente                                           |
| admin@gemeenteapp.nl    | wachtwoord | admin    | - Gemeente aanmaken via de frontend<br>- Volledige rechten via de API                                                                                                                                |