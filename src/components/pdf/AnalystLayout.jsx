import React from 'react';
import { Page, Text, View, StyleSheet, Image, Link, Svg, Path, Circle } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        padding: 0,
        fontFamily: 'Times-Roman',
        flexDirection: 'row',
    },
    sidebar: {
        width: '32%',
        padding: '0.4in 0.25in',
        color: '#ffffff',
    },
    main: {
        width: '68%',
        padding: '0.5in',
        backgroundColor: 'transparent',
    },
    photoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    photo: {
        width: 100,
        height: 100,
        borderRadius: 50,
        border: '2pt solid #c9a84c',
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#ffffff',
    },
    sidebarSection: {
        marginBottom: 20,
    },
    sidebarTitle: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#c9a84c',
        textTransform: 'uppercase',
        borderBottomWidth: 1.5, // Increased thickness slightly for premium look
        borderBottomColor: '#c9a84c', // Fixed: Solid gold color
        paddingBottom: 5,
        marginBottom: 10,
        letterSpacing: 1.5,
    },
    contactItem: {
        flexDirection: 'row',
        marginBottom: 6,
        fontSize: 9.5,
        alignItems: 'center',
    },
    contactIcon: {
        color: '#c9a84c',
        marginRight: 8,
        fontSize: 10,
    },
    sidebarText: {
        fontSize: 9.5,
        color: '#f1f5f9',
        lineHeight: 1.4,
    },
    skillItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    skillDot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#c9a84c',
        marginRight: 7,
    },
    eduItem: {
        marginBottom: 12,
    },
    eduDegree: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 2,
    },
    eduSchool: {
        fontSize: 9.5,
        color: '#cbd5e1',
    },
    eduYear: {
        fontSize: 9,
        color: '#c9a84c',
        marginTop: 2,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#1b2a4a',
        textTransform: 'uppercase',
        borderBottomWidth: 2,
        borderBottomColor: '#1b2a4a',
        paddingBottom: 6,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    sectionIcon: {
        color: '#c9a84c',
        marginRight: 8,
    },
    description: {
        fontSize: 10.5,
        color: '#334155',
        textAlign: 'justify',
        lineHeight: 1.5,
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: 3,
    },
    itemBold: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#1b2a4a',
    },
    duration: {
        fontSize: 9.5,
        color: '#64748b',
    },
    itemSub: {
        fontSize: 10,
        color: '#c9a84c',
        fontWeight: 'bold',
        marginBottom: 4,
    },
    diamondIcon: {
        marginRight: 6,
    }
});

const AnalystLayout = ({ data }) => {
    const { personalInfo = {}, skills = [], experience = [], education = [], projects = [], achievements = [] } = data;

    return (
        <Page size="A4" style={styles.page}>
            <Image
                src="/Resume Templates/analystDesign.png"
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                fixed
            />

            <View style={styles.sidebar}>
                {personalInfo.photo && (
                    <View style={styles.photoContainer}>
                        <Image style={styles.photo} src={personalInfo.photo} />
                    </View>
                )}
                {personalInfo.name && <Text style={styles.name}>{personalInfo.name}</Text>}

                {(personalInfo.email || personalInfo.phone || personalInfo.location || personalInfo.links) && (
                    <View style={styles.sidebarSection}>
                        <Text style={styles.sidebarTitle}>CONTACT</Text>
                        
                        {personalInfo.email && (
                            <View style={styles.contactItem}>
                                <Svg width="10" height="10" style={styles.contactIcon} viewBox="0 0 24 24">
                                    <Path fill="#c9a84c" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                                </Svg>
                                <Text style={styles.sidebarText}>{personalInfo.email}</Text>
                            </View>
                        )}
                        
                        {personalInfo.phone && (
                            <View style={styles.contactItem}>
                                <Svg width="10" height="10" style={styles.contactIcon} viewBox="0 0 24 24">
                                    <Path fill="#c9a84c" d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                                </Svg>
                                <Text style={styles.sidebarText}>{personalInfo.phone}</Text>
                            </View>
                        )}
                        
                        {personalInfo.location && (
                            <View style={styles.contactItem}>
                                <Svg width="10" height="10" style={styles.contactIcon} viewBox="0 0 24 24">
                                    <Path fill="#c9a84c" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                </Svg>
                                <Text style={styles.sidebarText}>{personalInfo.location}</Text>
                            </View>
                        )}
                        
                        {personalInfo.links && (
                            <View style={styles.contactItem}>
                                <Svg width="10" height="10" style={styles.contactIcon} viewBox="0 0 24 24">
                                    <Path fill="#c9a84c" d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
                                </Svg>
                                <Link src={personalInfo.links.startsWith('http') ? personalInfo.links : `https://${personalInfo.links}`} style={[styles.sidebarText, { color: '#93c5fd', textDecoration: 'none' }]}>
                                    {personalInfo.links}
                                </Link>
                            </View>
                        )}
                    </View>
                )}

                {skills && skills.length > 0 && (
                    <View style={styles.sidebarSection}>
                        <Text style={styles.sidebarTitle}>SKILLS</Text>
                        {skills.map((skill, i) => (
                            <View key={i} style={styles.skillItem}>
                                <View style={styles.skillDot} />
                                <Text style={styles.sidebarText}>{skill}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {education && education.length > 0 && (
                    <View style={styles.sidebarSection}>
                        <Text style={styles.sidebarTitle}>EDUCATION</Text>
                        {education.map((edu, i) => (
                            <View key={i} style={styles.eduItem}>
                                <Text style={styles.eduDegree}>{edu.degree || edu.course}</Text>
                                <Text style={styles.eduSchool}>{edu.school || edu.university}</Text>
                                <Text style={styles.eduYear}>{edu.year}</Text>
                            </View>
                        ))}
                    </View>
                )}
            </View>

            <View style={styles.main}>
                {personalInfo.summary && (
                    <View style={styles.section}>
                        <View style={styles.sectionTitle}>
                            <Svg width="10" height="10" style={styles.diamondIcon} viewBox="0 0 24 24">
                                <Path fill="#c9a84c" d="M12 2L2 12l10 10l10-10L12 2z"/>
                            </Svg>
                            <Text>PROFESSIONAL PROFILE</Text>
                        </View>
                        <Text style={styles.description}>{personalInfo.summary}</Text>
                    </View>
                )}

                {experience && experience.length > 0 && (
                    <View style={styles.section}>
                        <View style={styles.sectionTitle}>
                            <Svg width="10" height="10" style={styles.diamondIcon} viewBox="0 0 24 24">
                                <Path fill="#c9a84c" d="M12 2L2 12l10 10l10-10L12 2z"/>
                            </Svg>
                            <Text>PROFESSIONAL EXPERIENCE</Text>
                        </View>
                        {experience.map((exp, i) => (
                            <View key={i} style={{ marginBottom: 14 }}>
                                <View style={styles.itemHeader}>
                                    <Text style={styles.itemBold}>{exp.role || exp.jobTitle}</Text>
                                    <Text style={styles.duration}>{exp.duration}</Text>
                                </View>
                                <Text style={styles.itemSub}>{exp.company || exp.organization}</Text>
                                <Text style={styles.description}>{exp.description || exp.summary || exp.details}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {projects && projects.length > 0 && (
                    <View style={styles.section}>
                        <View style={styles.sectionTitle}>
                            <Svg width="10" height="10" style={styles.diamondIcon} viewBox="0 0 24 24">
                                <Path fill="#c9a84c" d="M12 2L2 12l10 10l10-10L12 2z"/>
                            </Svg>
                            <Text>PROJECTS & ANALYSIS</Text>
                        </View>
                        {projects.map((proj, i) => (
                            <View key={i} style={{ marginBottom: 14 }}>
                                <View style={styles.itemHeader}>
                                    <Text style={styles.itemBold}>{proj.title}</Text>
                                    {proj.link && (
                                        <Link src={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} style={{ fontSize: 9, color: '#2563eb', textDecoration: 'none' }}>
                                            View Project
                                        </Link>
                                    )}
                                </View>
                                <Text style={styles.description}>{proj.description || proj.summary || proj.details || proj.projectDescription}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {achievements && achievements.length > 0 && (
                    <View style={styles.section}>
                        <View style={styles.sectionTitle}>
                            <Svg width="10" height="10" style={styles.diamondIcon} viewBox="0 0 24 24">
                                <Path fill="#c9a84c" d="M12 2L2 12l10 10l10-10L12 2z"/>
                            </Svg>
                            <Text>AWARDS & CERTIFICATIONS</Text>
                        </View>
                        {achievements.map((ach, i) => (
                            <View key={i} style={{ marginBottom: 14 }}>
                                <Text style={[styles.itemBold, { marginBottom: 4 }]}>{ach.title || ach.award}</Text>
                                <Text style={styles.description}>{ach.description || ach.summary || ach.details || ach.achievementDescription}</Text>
                            </View>
                        ))}
                    </View>
                )}
            </View>
        </Page>
    );
};

export default AnalystLayout;
