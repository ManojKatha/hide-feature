import Head from "next/head";
import Header from "../components/header";
import Link from "next/link";
import {faqsListEn, faqsListMl, faqsListTn} from "../services/utils"
import {useEffect, useState} from "react";
import CopyrightFooter from "../components/copyright_footer";
import {FiChevronDown, FiChevronLeft, FiChevronRight} from "react-fi";
import {Disclosure, Transition} from "@headlessui/react";
import SplitLine from "../components/split_line";
import {useRouter} from "next/router";

import React from 'react';


export default function Faq(props) {
    const router = useRouter();
    const [userObj, setUserObj] = useState({ verified: false });
    const [filteredFAQList, setFilteredFAQList] = useState([]);
    const [faqsList, setFaqsList] = useState(faqsListEn);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [qSearchQuery, setQSearchQuery] = useState(router.query.q || null);
    const [searchQuery, setSearchQuery] = useState(null);
    const [topics, setTopics] = useState([]);
    const [language, setLanguage] = useState('en');
    const [searchPlaceholder, setSearchPlaceholder] = useState('Search payment, green tick, screenshot, clicks, etc.');

    const staticTexts = {
        en: {
            title: 'Frequently Asked Questions',
            subtitle: 'Browse queries by topic',
            searchPlaceholder: 'Search payment, green tick, screenshot, clicks, etc.',
            contactUs: 'Contact us via email',
            primaryQuestion: 'Not getting enough ads?',
            primaryAnswer: 'We are trying to bring great content for you to share on WhatsApp. For this to be beneficial for you and the brand, we will give you the most relevant ads only. We will notify you on WhatsApp as soon as new ads are available for you.'
        },
        ml: {
            title: 'അപേക്ഷിച്ച ചോദ്യങ്ങൾ',
            subtitle: 'വിഷയം പ്രകാരം പ്രശ്നങ്ങൾ ബ്രൗസ് ചെയ്യുക',
            searchPlaceholder: 'പേയ്‌മെന്റ്, ഗ്രീൻ ടിക്ക് മുതലായവയെകുറിച്ച് ഇവിടെ സെർച്ച് ചെയ്യുക.',
            contactUs: 'ഞങ്ങളെ സമീപിക്കുക',
            primaryQuestion: 'മതിയായ പരസ്യങ്ങൾ ലഭിക്കുന്നില്ലേ?',
            primaryAnswer: 'നിങ്ങൾക്ക് WhatsApp-ൽ ഷെയർ ചെയ്യുന്നതിന് മികച്ച പരസ്യങ്ങൾ കൊണ്ടുവരാൻ ഞങ്ങൾ ശ്രമിക്കുന്നുണ്ട്. ഇത് നിങ്ങൾക്കും ബ്രാൻഡിനും പ്രയോജനകരമാകുന്നതിന്, ഞങ്ങൾ നിങ്ങൾക്ക് ഏറ്റവും പ്രസക്തമായ പരസ്യങ്ങൾ മാത്രമാണ് നൽകുന്നത്. പുതിയ പരസ്യങ്ങൾ ലഭ്യമാകുമ്പോൾ ഞങ്ങൾ WhatsApp-ൽ നിങ്ങളെ അറിയിക്കുന്നതാണ്.'
        },
        tn: {
            title: 'அடிக்கடி கேட்கப்படும் கேள்விகள்',
            subtitle: 'தலைப்பு வாரியாக வினவல்களை உலாவவும்',
            searchPlaceholder: 'தேடல் கட்டணம், கிரீன் டிக், ஸ்கிரீன்ஷாட், கிளிக்குகள்.',
            contactUs: 'எங்களை தொடர்பு கொள்ள',
            primaryQuestion: 'போதுமான விளம்பரங்கள் கிடைக்கவில்லையா?',
            primaryAnswer: 'வாட்ஸ்அப்பில் பகிர சிறந்த விளம்பரங்களை உங்களுக்கு வழங்க நாங்கள் முயற்சி செய்கிறோம். உங்களுக்கும் பிராண்டிற்கும் இது பயனுள்ளதாக இருக்க, நாங்கள் உங்களுக்கு மிகவும் பொருத்தமான விளம்பரங்களை மட்டுமே வழங்குகிறோம். புதிய விளம்பரங்கள் கிடைக்கும்போது வாட்ஸ்அப்பில் அறிவிப்போம்.'
        }
    }

    useEffect(() => {
        // Function to fetch user data from the API
        const fetchUserData = async () => {
            // const response = await axios.get('/api/user'); // Adjust the API endpoint as needed
            // const userData = response.data.data; // Adjust based on the API response structure
    
            // setUserObj(prevState => ({
            //   ...prevState,
            //   verified: userData.verified,
            // }));
        };
    
        fetchUserData();
      }, []);

    useEffect(() => {
        setSelectedTopic(null);
        setSearchQuery(null);
        setFilteredFAQList([]);

        if (language === 'ml') {
            setFaqsList(faqsListMl);
            setSearchPlaceholder(staticTexts.ml.searchPlaceholder);
        }

        else if (language === 'tn'){
            setFaqsList(faqsListTn);
            setSearchPlaceholder(staticTexts.tn.searchPlaceholder);
        }

        else {
            setFaqsList(faqsListEn);
            setSearchPlaceholder(staticTexts.en.searchPlaceholder);
        }

    }, [language]);

    useEffect(() => {
        let distinctTopics = [...new Set(faqsList.map((x) => x.topic))];
        distinctTopics = distinctTopics.filter((x) => !!x);
        setTopics(distinctTopics);
        if (!!qSearchQuery) {
            document.getElementById('search-box').value = qSearchQuery;
            setSelectedTopic(null);
            setSearchQuery(qSearchQuery);
            setFilteredFAQList(faqsList.filter((x) => (x.question + x.answer).toLowerCase().includes(qSearchQuery.toLowerCase())));
        }
    }, [faqsList]);

    return (
        <div className="h-screen flex flex-col">
            <Head>
                <title>Unizone | FAQ</title>
            </Head>

            {props.user && <Header user={props.user} page={"profile"} signOut={props.signOut}/>}

            <div className="text-2xl m-4 text-center">
                {staticTexts[language].title}
            </div>
            <div className="mx-auto mb-2 text-lg flex">
                <div
                    className={`mx-2 px-2 rounded transition-all duration-100 ${language === 'en' ? 'bg-[#02adb524] text-accent' : ''}`}
                    onClick={() => {
                        if (window.navigator.vibrate) window.navigator.vibrate(50);
                        setLanguage('en');
                        window.gtag("event", "faq_lang_en");
                    }}>English
                </div>
                <div
                    className={`mx-2 px-2 rounded transition-all duration-100 ${language === 'ml' ? 'bg-[#02adb524] text-accent' : ''}`}
                    onClick={() => {
                        if (window.navigator.vibrate) window.navigator.vibrate(50);
                        setLanguage('ml');
                        window.gtag("event", "faq_lang_ml");
                    }}>മലയാളം
                </div>
                <div
                    className={`mx-2 px-2 rounded transition-all duration-100 ${language === 'tn' ? 'bg-[#02adb524] text-accent' : ''}`}
                    onClick={() => {
                        if (window.navigator.vibrate) window.navigator.vibrate(50);
                        setLanguage('tn');
                        window.gtag("event", "faq_lang_tn");
                    }}>தமிழ்
                </div>
            </div>

            <div className="flex ml-4 mt-2 mr-4">
                <div className="mb-3 w-full">
                    <input
                        id="search-box"
                        type="search"
                        className="placeholder:text-sm relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out focus:border-primary-600 focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200"
                        onChange={(event) => {
                            if (!!event.target.value) {
                                setSelectedTopic(null);
                                setSearchQuery(event.target.value);
                                setFilteredFAQList(faqsList.filter((x) => (x.question + x.answer).toLowerCase().includes(event.target.value.toLowerCase())));
                            } else {
                                setSearchQuery(null);
                                setFilteredFAQList([]);
                            }
                        }}
                        placeholder={searchPlaceholder}/>
                </div>
            </div>

            {!searchQuery && <>
                <div className="mt-4 mb-2 mx-4 text-md mt-2 text-lts">
                    {!!selectedTopic ?
                        <div className="flex" onClick={() => {
                            setSelectedTopic(null);
                            setFilteredFAQList([]);
                        }}>
                            <div className="uppercase my-auto flex"><FiChevronLeft className="-ml-1.5 my-auto"
                                                                                   size={"1.2rem"}/> {selectedTopic}
                            </div>
                        </div>
                        :
                        <div className="flex">
                            <div className="uppercase my-auto">
                                {staticTexts[language].subtitle}
                            </div>
                        </div>
                    }
                </div>
                <div className="mx-4">
                    {!selectedTopic && <>
                        <div>{
                            topics.map(function (topicName) {
                                return (
                                    <div key={`topic-${topicName}`}
                                         className={`flex py-3 ${selectedTopic === topicName ? 'bg-accent' : ''}`}
                                         onClick={() => {
                                             if (window.navigator.vibrate) window.navigator.vibrate(50);
                                             setSelectedTopic(topicName);
                                             setFilteredFAQList(faqsList.filter((x) => x.topic === topicName));
                                         }}>
                                        <div className="text-lg">{topicName}</div>
                                        <div className="grow"></div>
                                        <div className="my-auto"><FiChevronRight/></div>
                                    </div>);
                            })
                        }</div>
                    </>}
                </div>
            </>}

            <div className="mx-4">
                {filteredFAQList.map((faq, index) => (
                    <Disclosure key={"faq-" + index}>
                        {({open}) => (
                            <>
                                <Disclosure.Button
                                    className='flex w-full justify-between text-accent items-center bg-[#02adb524] my-2 rounded px-2 text-lg py-1 transition'>
                                    <span className="text-left mr-2">{faq.question}</span>
                                    <span className="shrink-0">
                                        <FiChevronDown className={open ? "rotate-180 transform" : ""}/>
                                    </span>
                                </Disclosure.Button>
                                <Transition
                                    enter="transition duration-100 ease-out"
                                    enterFrom="transform scale-95 opacity-0"
                                    enterTo="transform scale-100 opacity-100"
                                    leave="transition duration-75 ease-out"
                                    leaveFrom="transform scale-100 opacity-100"
                                    leaveTo="transform scale-95 opacity-0">
                                    <Disclosure.Panel
                                        className="px-2 pt-1 pb-3 text-lts whitespace-pre-line">{faq.answer}</Disclosure.Panel>
                                </Transition>
                            </>
                        )}
                    </Disclosure>
                ))}
            </div>
            {userObj.verified ? (
            <div className="mx-4 mb-2 text-lg">
                <SplitLine/>
                <div className="flex py-3">
                    <div className="flex flex-col">
                        {staticTexts[language].contactUs}
                        <div className="text-sm opacity-70">Please email your query to support@katha.today, and we will make every effort to address it promptly.</div>
                    </div>
                    <div className="grow"></div>
                </div>
            </div>
            ) : (
                <div></div>
            )}
            <div className="mx-4 mb-3 text-lg">
                <div className="flex py-3 bg-lightaccent px-3 rounded text-darkaccent">
                    <div className="flex flex-col">
                        <span className="leading-5">{staticTexts[language].primaryQuestion}</span>
                        <div className="mt-1 text-sm opacity-70">
                            {staticTexts[language].primaryAnswer}
                        </div>
                    </div>
                    <div className="grow"></div>
                </div>
            </div>
            <div className="grow"></div>
            <CopyrightFooter/>
        </div>
    );
}

