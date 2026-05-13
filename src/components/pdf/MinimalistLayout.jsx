import React from 'react';
import { Page, Text, View, StyleSheet, Image, Link } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        padding: 0,
        fontFamily: 'Times-Roman',
        backgroundColor: '#ffffff',
    },
    sidebar: {
        width: '31%',
        padding: '0.5in 0.4in',
        height: '100%',
    },
    mainContent: {
        width: '69%',
        padding: '0.5in 0.5in',
        height: '100%',
    },
    photoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    photo: {
        width: 90,
        height: 90,
        borderRadius: 12,
        border: '3pt solid #f8fafc',
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0f172a',
        textAlign: 'center',
        marginBottom: 25,
        letterSpacing: -0.5,
    },
    sidebarSection: {
        marginBottom: 25,
    },
    sidebarTitle: {
        fontSize: 9.5,
        fontWeight: 'bold',
        color: '#0f172a',
        textTransform: 'uppercase',
        letterSpacing: 1,
        paddingBottom: 3, // Tightened gap between text and line
    },
    sidebarTitleLine: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: 20,
        height: 2,
        backgroundColor: '#3b82f6',
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    contactText: {
        fontSize: 9.5,
        color: '#475569',
        marginBottom: 6, // Added spacing between contact lines
    },
    skillContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
        marginTop: 5,
    },
    skillTag: {
        fontSize: 9,
        color: '#475569',
        backgroundColor: '#f1f5f9',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    mainSection: {
        marginBottom: 15,
    },
    mainTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#0f172a',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginTop: 5,
        paddingBottom: 3, // Tightened gap between text and line
    },
    mainTitleLine: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: 30,
        height: 2,
        backgroundColor: '#3b82f6',
    },
    summaryText: {
        fontSize: 10.5,
        color: '#475569',
        lineHeight: 1.6,
        textAlign: 'justify',
    },
    contentItem: {
        marginBottom: 18,
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: 6, // Synced: Standardize header gap
    },
    bold: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#0f172a',
    },
    duration: {
        fontSize: 9,
        color: '#94a3b8',
    },
    subtitle: {
        fontSize: 10,
        color: '#1e293b',
        fontWeight: 'bold',
        marginBottom: 6, // Increased margin between Company and Description
    },
    educationYear: {
        fontSize: 9,
        color: '#94a3b8',
        marginBottom: 5, // Increased from 2 to 5 for better separation
    },
    description: {
        fontSize: 10,
        color: '#475569',
        lineHeight: 1.6,
        textAlign: 'justify',
    },
    bulletList: {
        marginTop: 6,
        marginLeft: 12,
    },
    bulletItem: {
        flexDirection: 'row',
        marginBottom: 4,
    },
    bullet: {
        width: 14,
        fontSize: 10,
        color: '#3b82f6',
        fontWeight: 'bold',
    },
    bulletText: {
        flex: 1,
        fontSize: 10,
        color: '#475569',
        lineHeight: 1.4,
    }
});

const MinimalistLayout = ({ data }) => {
    const { personalInfo = {}, skills = [], experience = [], education = [], projects = [], achievements = [] } = data;

    const renderDescription = (text) => {
        if (!text) return null;
        const lines = text.split('\n').filter(line => line.trim());
        if (lines.length <= 1) return <Text style={styles.description}>{text}</Text>;
        
        return (
            <View style={styles.bulletList}>
                {lines.map((line, i) => (
                    <View key={i} style={styles.bulletItem}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletText}>{line.replace(/^[•\-\*]\s*/, '')}</Text>
                    </View>
                ))}
            </View>
        );
    };

    return (
        <Page size="A4" style={styles.page}>
            <Image
                src="/Resume Templates/minimalistDesign.png"
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
                        <View style={{ position: 'relative', marginBottom: 12 }}>
                            <Text style={styles.sidebarTitle}>CONTACT</Text>
                            <View style={styles.sidebarTitleLine} />
                        </View>
                        {personalInfo.email && <Text style={styles.contactText}>{personalInfo.email}</Text>}
                        {personalInfo.phone && <Text style={styles.contactText}>{personalInfo.phone}</Text>}
                        {personalInfo.location && <Text style={styles.contactText}>{personalInfo.location}</Text>}
                        {personalInfo.links && (
                            <Link src={personalInfo.links.startsWith('http') ? personalInfo.links : `https://${personalInfo.links}`} style={[styles.contactText, { color: '#3b82f6', textDecoration: 'none', marginBottom: 0 }]}>
                                {personalInfo.links}
                            </Link>
                        )}
                    </View>
                )}

                {skills && skills.length > 0 && skills.some(s => s && s.trim()) && (
                    <View style={styles.sidebarSection}>
                        <View style={{ position: 'relative', marginBottom: 12 }}>
                            <Text style={styles.sidebarTitle}>SKILLS</Text>
                            <View style={styles.sidebarTitleLine} />
                        </View>
                        <View style={styles.skillContainer}>
                            {skills.filter(s => s && s.trim()).map((skill, i) => (
                                <Text key={i} style={styles.skillTag}>{skill}</Text>
                            ))}
                        </View>
                    </View>
                )}

                {education && education.length > 0 && (
                    <View style={styles.sidebarSection}>
                        <View style={{ position: 'relative', marginBottom: 12 }}>
                            <Text style={styles.sidebarTitle}>EDUCATION</Text>
                            <View style={styles.sidebarTitleLine} />
                        </View>
                        {education.map((edu, i, arr) => (
                            <View key={i} style={{ marginBottom: i === arr.length - 1 ? 0 : 15 }}>
                                <Text style={[styles.bold, { fontSize: 10, marginBottom: 5 }]}>{edu.degree || edu.course}</Text>
                                <Text style={styles.educationYear}>{edu.year}</Text>
                                <Text style={[styles.subtitle, { color: '#64748b', fontSize: 9.5, marginBottom: 0 }]}>{edu.school || edu.university}</Text>
                            </View>
                        ))}
                    </View>
                )}
            </View>

            <View style={styles.mainContent}>
                {personalInfo.summary && (
                    <View style={styles.mainSection}>
                        <View style={{ position: 'relative', marginBottom: 12 }}>
                            <Text style={styles.mainTitle}>ABOUT</Text>
                            <View style={styles.mainTitleLine} />
                        </View>
                        <Text style={styles.summaryText}>{personalInfo.summary}</Text>
                    </View>
                )}

                {experience && experience.length > 0 && (
                    <View style={styles.mainSection}>
                        <View style={{ position: 'relative', marginBottom: 12 }}>
                            <Text style={styles.mainTitle}>EXPERIENCE</Text>
                            <View style={styles.mainTitleLine} />
                        </View>
                        {experience.map((exp, i) => (
                            <View key={i} style={styles.contentItem} wrap={false}>
                                <View style={styles.itemHeader}>
                                    <Text style={styles.bold}>{exp.role || exp.jobTitle}</Text>
                                    <Text style={styles.duration}>{exp.duration}</Text>
                                </View>
                                <Text style={styles.subtitle}>{exp.company}</Text>
                                {renderDescription(exp.description)}
                            </View>
                        ))}
                    </View>
                )}

                {projects && projects.length > 0 && (
                    <View style={styles.mainSection}>
                        <View style={{ position: 'relative', marginBottom: 12 }}>
                            <Text style={styles.mainTitle}>PROJECTS</Text>
                            <View style={styles.mainTitleLine} />
                        </View>
                        {projects.map((proj, i) => (
                            <View key={i} style={styles.contentItem} wrap={false}>
                                <View style={[styles.itemHeader, { marginBottom: 6 }]}>
                                    <Text style={styles.bold}>{proj.title}</Text>
                                    {proj.link && (
                                        <Link src={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} style={{ fontSize: 9, color: '#3b82f6', textDecoration: 'none' }}>
                                            View Project
                                        </Link>
                                    )}
                                </View>
                                {renderDescription(proj.description || proj.summary || proj.details || proj.projectDescription || proj.content)}
                            </View>
                        ))}
                    </View>
                )}

                {achievements && achievements.length > 0 && (
                    <View style={styles.mainSection}>
                        <View style={{ position: 'relative', marginBottom: 12 }}>
                            <Text style={styles.mainTitle}>ACHIEVEMENTS</Text>
                            <View style={styles.mainTitleLine} />
                        </View>
                        {achievements.map((ach, i) => (
                            <View key={i} style={styles.contentItem} wrap={false}>
                                <View style={[styles.itemHeader, { marginBottom: 8 }]}>
                                    <Text style={styles.bold}>{ach.title || ach.award}</Text>
                                </View>
                                {renderDescription(ach.description || ach.summary || ach.details || ach.achievementDescription)}
                            </View>
                        ))}
                    </View>
                )}
            </View>
        </Page>
    );
};

export default MinimalistLayout;
