const purchaseSteps = [
  {
    number: 1,
    park: "Hollywood Studios",
    date: "20.9",
    title: "לנעול קודם את Slinky",
    items: [
      {
        label: "Multi Pass — Tier 1",
        text: "Slinky Dog Dash. זו העדיפות הגבוהה ביותר בכל יום ההזמנות. לקחת כמעט כל שעה סבירה, גם אחרי Savi’s Workshop."
      },
      {
        label: "Multi Pass — Tier 2",
        text: "Toy Story Mania + בחירה נוספת עם עדיפות לשעה מוקדמת. גם Star Tours יכול להיות שימושי אם הוא נותן tap מוקדם."
      },
      {
        label: "Single Pass",
        text: "Rise of the Resistance לכל המשפחה, אם מחליטים שהעלות הנוספת שווה לנו בשביל להקטין סיכון ולשחרר את ה-Rope Drop למתקן אחר."
      }
    ]
  },
  {
    number: 2,
    park: "Magic Kingdom",
    date: "18.9",
    title: "יום קצר — חשוב במיוחד לקבל שעות טובות",
    items: [
      {
        label: "Multi Pass — Tier 1",
        text: "בחירה ראשונה: Tiana’s Bayou Adventure. אם השעה לא טובה, לבחור Big Thunder Mountain Railroad. גיבוי נוסף: Peter Pan’s Flight."
      },
      {
        label: "Multi Pass — Tier 2",
        text: "Buzz Lightyear’s Space Ranger Spin + The Many Adventures of Winnie the Pooh."
      },
      {
        label: "מטרה חשובה",
        text: "לנסות שלפחות אחד משני מתקני Tier 2 יהיה מוקדם מאוד, כדי לבצע tap מוקדם ולפתוח בחירה נוספת."
      },
      {
        label: "Single Pass",
        text: "Seven Dwarfs Mine Train לכל 5 בני המשפחה, באותה רכישה."
      },
      {
        label: "שיקול מיוחד",
        text: "Magic Kingdom נסגר ב-18:00 בגלל Halloween Party, ולכן שעה טובה יכולה להיות חשובה יותר מהבדל קטן בין שתי אפשרויות Tier 1."
      }
    ]
  },
  {
    number: 3,
    park: "EPCOT",
    date: "17.9",
    title: "Test Track במולטי, Guardians בסינגל",
    items: [
      {
        label: "Multi Pass — Tier 1",
        text: "Test Track."
      },
      {
        label: "Multi Pass — Tier 2",
        text: "Soarin’ Across America + Mission: SPACE. ב-Mission: SPACE נעדיף את Green Mission."
      },
      {
        label: "מטרה חשובה",
        text: "לנסות לקבל לפחות אחד משני מתקני Tier 2 בשעה מוקדמת כדי לפתוח בחירה נוספת מהר."
      },
      {
        label: "Single Pass",
        text: "Guardians of the Galaxy: Cosmic Rewind לכל 5 בני המשפחה, באותה רכישה."
      }
    ]
  },
  {
    number: 4,
    park: "Animal Kingdom",
    date: "21.9",
    title: "Flight of Passage + החלטה אם בכלל צריך Multi Pass",
    items: [
      {
        label: "Single Pass",
        text: "Avatar Flight of Passage ל-4, ללא הקטנה, ולהשתמש ב-Rider Switch."
      },
      {
        label: "Multi Pass",
        text: "עדיין בהתלבטות. אם קונים, המטרות העיקריות הן Na’vi River Journey ו-Kilimanjaro Safaris."
      },
      {
        label: "למה כן לקנות?",
        text: "בעיקר כדי לקצר את יום Animal Kingdom, כי זה גם יום מעבר מלון ואולי נרצה EPCOT Extended Evening Hours בערב."
      },
      {
        label: "למה לא לקנות?",
        text: "אפשר לעשות Na’vi ב-Rope Drop, Flight of Passage כבר מכוסה ב-Single Pass, ו-Expedition Everest אפשר לעשות ב-Single Rider."
      }
    ]
  },
  {
    number: 5,
    park: "Magic Kingdom",
    date: "18.9",
    title: "TRON לקבוצה של 4",
    items: [
      {
        label: "Single Pass",
        text: "TRON Lightcycle / Run ל-4, ללא הקטנה."
      },
      {
        label: "למה רק עכשיו?",
        text: "זו קבוצה שונה מהקבוצה המלאה של 5, ולכן נשאיר את שינוי המשתתפים לאחר שסגרנו את ההזמנות העיקריות לכל המשפחה."
      }
    ]
  },
  {
    number: 6,
    park: "כל הפארקים",
    date: "",
    title: "רק עכשיו חוזרים לשפר שעות",
    items: [
      {
        label: "אופטימיזציה",
        text: "אחרי שכל ההזמנות הקריטיות נעולות, לחזור ולבדוק אם אפשר לשפר Return Times בלי לסכן את מה שכבר השגנו."
      },
      {
        label: "כלל גיאוגרפי",
        text: "אם שתי שעות דומות באיכות שלהן, להעדיף את זו ששומרת אותנו באותו אזור בפארק ומונעת הליכות מיותרות מצד לצד."
      }
    ]
  }
];

const parkStrategies = [
  {
    park: "Magic Kingdom",
    date: "18.9",
    subtitle: "יום קצר עד 18:00 ואז מעבר ל-EPCOT",
    sections: [
      {
        title: "מה מזמינים מראש",
        items: [
          "Tier 1: Tiana’s Bayou Adventure.",
          "אם ל-Tiana אין שעה טובה: Big Thunder Mountain Railroad.",
          "אם גם זה לא מסתדר: Peter Pan’s Flight.",
          "Tier 2: Buzz Lightyear’s Space Ranger Spin + Winnie the Pooh.",
          "Single Pass: Seven Dwarfs Mine Train לכל 5.",
          "Single Pass: TRON ל-4, ללא הקטנה."
        ]
      },
      {
        title: "Rope Drop",
        items: [
          "ה-Rope Drop ייקבע לפי מה שהצלחנו להזמין.",
          "אם Peter Pan לא מכוסה, הוא מועמד חזק ל-Early Entry.",
          "אם Peter Pan כבר מכוסה, אפשר להשתמש בבוקר ל-Pooh, Barnstormer, Under the Sea או מתקנים אחרים באזור.",
          "Seven Dwarfs לא צריך Rope Drop אם קנינו Single Pass."
        ]
      },
      {
        title: "אחרי ה-tap הראשון",
        items: [
          "לבדוק מיד אם אפשר להשיג את מתקן Tier 1 החשוב שחסר לנו.",
          "אם הזמנו Tiana, לחפש Big Thunder.",
          "אם הזמנו Big Thunder, לחפש Tiana.",
          "אחר כך לבדוק Peter Pan, Pirates ושאר המתקנים הרצויים.",
          "כאשר המתקנים החשובים ב-Magic Kingdom כבר מכוסים, אפשר להתחיל לחפש Lightning Lane ל-EPCOT לערב."
        ]
      },
      {
        title: "מיקום גיאוגרפי",
        items: [
          "Tiana + Big Thunder נמצאים יחד באזור המערבי של הפארק.",
          "Peter Pan + Winnie the Pooh + Seven Dwarfs נמצאים ב-Fantasyland.",
          "Buzz + TRON נמצאים ב-Tomorrowland.",
          "כדאי לנסות ליצור בלוקים לפי אזור ולא לעבור שוב ושוב מצד אחד של הפארק לצד השני."
        ]
      },
      {
        title: "מתקנים נוספים שאנחנו רוצים",
        items: [
          "The Barnstormer.",
          "Dumbo — נחמד אבל לא בעדיפות גבוהה.",
          "Pirates of the Caribbean.",
          "Under the Sea.",
          "Tomorrowland Speedway.",
          "it’s a small world.",
          "Mad Tea Party.",
          "The Magic Carpets of Aladdin.",
          "מפגש עם Ariel אם התור מתאים."
        ]
      }
    ]
  },
  {
    park: "EPCOT",
    date: "17.9",
    subtitle: "יום EPCOT מרכזי + מעבר ל-Magic Kingdom בערב",
    sections: [
      {
        title: "מה מזמינים מראש",
        items: [
          "Tier 1: Test Track.",
          "Tier 2: Soarin’ Across America.",
          "Tier 2: Mission: SPACE — Green Mission.",
          "Single Pass: Guardians of the Galaxy: Cosmic Rewind לכל 5."
        ]
      },
      {
        title: "Rope Drop",
        items: [
          "Frozen Ever After הוא ה-Rope Drop המועדף כרגע.",
          "Remy’s Ratatouille Adventure קרוב מאוד לכניסה שלנו דרך International Gateway, אבל הוא בעדיפות נמוכה יותר כי כבר עשינו אותו בפריז.",
          "אם האסטרטגיה משתנה לפי הזמינות בפועל, אפשר לשקול שוב את Remy."
        ]
      },
      {
        title: "אחרי ה-tap הראשון",
        items: [
          "לבדוק אם אפשר להשיג Tier 1 נוסף שחסר.",
          "אם Frozen כבר בוצע ב-Rope Drop ו-Test Track מכוסה, אפשר להתחיל להשלים מתקנים אחרים.",
          "Spaceship Earth, Nemo, Living with the Land ו-Figment יכולים לחכות לתור רגיל או לערב של 18.9."
        ]
      },
      {
        title: "מיקום גיאוגרפי",
        items: [
          "Test Track + Mission: SPACE + Guardians נמצאים באותו חלק כללי של הפארק ונוח לקבץ אותם.",
          "Soarin’ נמצא באזור אחר בחלק הקדמי של EPCOT.",
          "Frozen נמצא ב-Norway ב-World Showcase.",
          "Remy נמצא ליד France ובקרבת International Gateway, הכניסה שלנו מ-Beach Club."
        ]
      },
      {
        title: "המשך היום",
        items: [
          "Space 220 קבוע ל-13:30.",
          "לכוון בערך ליציאה לכיוון Magic Kingdom ב-17:30–18:00, בהתאם לשעת המצעד הסופית.",
          "בערב של 18.9 נחזור ל-EPCOT אחרי סגירת Magic Kingdom ונוכל להשלים מתקנים.",
          "Extended Evening Hours ב-21.9 הן בונוס בלבד. לא לבנות עליהן כי ייתכן שנהיה עייפים."
        ]
      }
    ]
  },
  {
    park: "Hollywood Studios",
    date: "20.9",
    subtitle: "Slinky בעדיפות עליונה, Savi’s ב-16:45",
    sections: [
      {
        title: "מה מזמינים מראש",
        items: [
          "Tier 1: Slinky Dog Dash — העדיפות העליונה.",
          "Tier 2: Toy Story Mania.",
          "Tier 2 נוסף: להעדיף שעה מוקדמת. Star Tours יכול להיות שימושי לצורך tap מוקדם.",
          "Single Pass: Rise of the Resistance אם מחליטים שהעלות שווה לנו."
        ]
      },
      {
        title: "Rope Drop",
        items: [
          "אם Slinky מכוסה ב-Multi Pass, לעשות Mickey & Minnie’s Runaway Railway.",
          "אם לא הצלחנו להשיג Slinky, לעשות Slinky ב-Rope Drop.",
          "אם Rise נקנה כ-Single Pass, אין צורך להשתמש עליו ב-Rope Drop."
        ]
      },
      {
        title: "אחרי ה-tap הראשון",
        items: [
          "לנסות להשיג Mickey & Minnie’s Runaway Railway או את רכבת החבובות.",
          "Millennium Falcon: Smugglers Run חשוב לנו, אבל נמצא בעדיפות נמוכה יותר מ-Slinky, Rise, Runaway Railway ורכבת החבובות.",
          "Star Tours נחמד לנו, אבל כבר עשינו אותו ולכן לא צריך לרדוף אחריו אם התור סביר."
        ]
      },
      {
        title: "מיקום גיאוגרפי",
        items: [
          "Slinky + Toy Story Mania נמצאים יחד ב-Toy Story Land.",
          "Rise + Millennium Falcon + Savi’s Workshop נמצאים יחד ב-Galaxy’s Edge.",
          "Mickey & Minnie’s Runaway Railway נמצא באזור המרכזי של הפארק.",
          "רכבת החבובות נמצאת בצד של Sunset Boulevard ולכן עדיף לשלב אותה כשהמסלול ממילא לוקח אותנו לאזור."
        ]
      },
      {
        title: "Savi’s Workshop",
        items: [
          "Savi’s קבוע ל-16:45.",
          "אין בעיה לקבל Slinky אחרי Savi’s.",
          "ל-Slinky יש חלון הגעה של שעה, ולכן גם Return Time שמתחיל אחרי Savi’s יכול לעבוד טוב.",
          "אחר הצהריים כדאי לנסות לקבץ Rise / Millennium Falcon / Savi’s כי כולם באותו אזור."
        ]
      },
      {
        title: "הזדמנות נוספת",
        items: [
          "ב-23.9 יש לנו אפשרות ל-Hollywood Studios Extended Evening Hours.",
          "אם משהו לא מסתדר ב-20.9, אפשר להשאיר אותו לערב המאוחר במקום להפוך את היום למרוץ."
        ]
      }
    ]
  },
  {
    park: "Animal Kingdom",
    date: "21.9",
    subtitle: "יום מעבר מלון — Multi Pass עדיין בהתלבטות",
    sections: [
      {
        title: "מה בטוח עושים",
        items: [
          "Single Pass: Avatar Flight of Passage ל-4, ללא הקטנה.",
          "להשתמש ב-Rider Switch.",
          "Expedition Everest רק למי שרוצה — להשתמש ב-Single Rider.",
          "Festival of the Lion King הוא Must Do."
        ]
      },
      {
        title: "אם לא קונים Multi Pass",
        items: [
          "לעשות Na’vi River Journey ב-Rope Drop.",
          "לעשות Kilimanjaro Safaris יחסית מוקדם.",
          "Flight of Passage כבר מכוסה ב-Single Pass.",
          "Festival of the Lion King לפי שעה נוחה במהלך היום."
        ]
      },
      {
        title: "אם כן קונים Multi Pass",
        items: [
          "המטרות המרכזיות: Na’vi River Journey + Kilimanjaro Safaris.",
          "הבחירה השלישית לפי זמינות ומה שיראה לנו שימושי.",
          "המטרה של הקנייה היא בעיקר לחסוך זמן ולא בהכרח לקבל גישה למשהו שלא ניתן לעשות אחרת."
        ]
      },
      {
        title: "מיקום גיאוגרפי",
        items: [
          "Flight of Passage + Na’vi River Journey נמצאים יחד ב-Pandora.",
          "Kilimanjaro Safaris + Festival of the Lion King משתלבים טוב באזור Africa.",
          "Expedition Everest נמצא ב-Asia ויכול להיות סטייה נפרדת עבור מי שרוצה לעשות אותו."
        ]
      },
      {
        title: "שיקול סוף היום",
        items: [
          "זה גם יום מעבר מ-Beach Club ל-Polynesian.",
          "אם יהיה כוח, יש אפשרות ל-EPCOT Extended Evening Hours בערב.",
          "לכן Multi Pass יכול להיות שווה בעיקר אם הוא מאפשר לנו לסיים את Animal Kingdom מוקדם ובנחת."
        ]
      }
    ]
  }
];

const generalRules = [
  "קודם לנעול את המתקנים הקריטיים. אחר כך לשפר שעות.",
  "שעה מוקדמת ב-Tier 2 יכולה להיות אסטרטגית יותר ממתקן מועדף מעט יותר בשעה מאוחרת.",
  "אחרי ה-tap הראשון לבדוק מיד זמינות לבחירה הבאה.",
  "לא להסתכל רק על זמינות — לבדוק גם איפה כל מתקן נמצא כדי לא ליצור זיגזגים.",
  "Rope Drop אינו קבוע מראש. הוא משלים את מה שלא הצלחנו להשיג ב-Lightning Lane.",
  "בימים שיש לנו פארק נוסף בערב, אפשר להשתמש בבחירות חדשות גם כדי לבנות את החלק השני של היום."
];

export default function LightningLane() {
  return (
    <main>
      <h1>⚡ אסטרטגיית Lightning Lane</h1>

      <p>
        תוכנית העבודה שלנו ליום פתיחת ההזמנות ולכל אחד מפארקי Disney.
        המטרה היא קודם לנעול את הדברים שקשה להשיג, ואז להשתמש ב-Rope Drop,
        בבחירות נוספות ובמיקום הגיאוגרפי כדי לבנות יום יעיל.
      </p>

      <section>
        <h2>🔥 סדר הפעולות ביום פתיחת ההזמנות</h2>

        <div className="cards-list">
          {purchaseSteps.map((step) => (
            <div className="card" key={step.number}>
              <h3>
                {step.number}. {step.park}
                {step.date && ` · ${step.date}`}
              </h3>

              <p>
                <strong>{step.title}</strong>
              </p>

              <ul>
                {step.items.map((item) => (
                  <li key={`${step.number}-${item.label}`}>
                    <strong>{item.label}:</strong> {item.text}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>🧠 כללי מפתח</h2>

        <div className="card">
          <ul>
            {generalRules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <h2>🏰 אסטרטגיה מפורטת לפי פארק</h2>

        <div className="cards-list">
          {parkStrategies.map((strategy) => (
            <details className="card" key={strategy.park}>
              <summary style={{ cursor: "pointer" }}>
                <strong>
                  {strategy.park} · {strategy.date}
                </strong>
                <div style={{ marginTop: "0.35rem", fontWeight: "normal" }}>
                  {strategy.subtitle}
                </div>
              </summary>

              <div style={{ marginTop: "1rem" }}>
                {strategy.sections.map((section) => (
                  <div key={`${strategy.park}-${section.title}`}>
                    <h4>{section.title}</h4>

                    <ul>
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}