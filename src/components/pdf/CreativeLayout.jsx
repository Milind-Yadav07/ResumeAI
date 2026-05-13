import React from 'react';
import { Page, Text, View, StyleSheet, Image, Link } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        padding: 0,
        fontFamily: 'Times-Roman',
    },
    sidebar: {
        width: '2.8in',
        padding: '0.5in 0.5in 0.5in 0.4in', // Increased right padding to balance space
        backgroundColor: 'transparent',
    },
    mainContent: {
        flex: 1,
        padding: '0.5in 0.5in 0.5in 0.4in', // Matches RowLayout horizontal padding (0.5in on right)
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#0f172a',
    },
    sidebarSection: {
        marginBottom: 25,
    },
    sidebarTitle: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#0f172a',
        textTransform: 'uppercase',
        borderBottomWidth: 1.5,
        borderBottomColor: '#94a3b8', // Fixed: Changed from dark blue/red-tint to Gray
        paddingBottom: 2,
        marginBottom: 10,
        letterSpacing: 0.5,
    },
    sidebarText: {
        fontSize: 10,
        color: '#334155',
        marginBottom: 5,
        lineHeight: 1.4,
    },
    linksSmall: {
        fontSize: 10,
        color: '#2563eb',
        textDecoration: 'none',
        marginBottom: 5,
    },
    skillItem: {
        fontSize: 10,
        color: '#334155',
        marginBottom: 8,
    },
    mainSection: {
        marginBottom: 0,
    },
    mainTitle: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#0f172a',
        textTransform: 'uppercase',
        borderBottomWidth: 2,
        borderBottomColor: '#0f172a',
        paddingBottom: 2,
        marginTop: 5, // Reduced further from 9 to 5
        marginBottom: 8,
        letterSpacing: 0.5,
    },
    description: {
        fontSize: 10.5,
        color: '#334155',
        textAlign: 'justify',
        lineHeight: 1.5,
        marginVertical: 5,
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
        color: '#0f172a',
    },
    itemDuration: {
        fontSize: 10,
        color: '#0f172a',
        fontWeight: 'bold',
    },
    itemSub: {
        fontSize: 10.5,
        color: '#475569',
        fontStyle: 'italic',
        marginBottom: 5,
    },
    sidebarSub: {
        fontSize: 10.5,
        color: '#64748b',
        fontStyle: 'italic',
        marginBottom: 5,
    },
    contentItem: {
        marginBottom: 20,
    }
});

const CreativeLayout = ({ data }) => {
    const { personalInfo = {}, skills = [], experience = [], education = [], projects = [], achievements = [] } = data;

    return (
        <Page size="A4" style={styles.page}>
            {/* Background Image Setup */}
            <Image
                src="/Resume Templates/creativeDesign.png"
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                fixed
            />

            <View style={styles.sidebar}>
                {personalInfo.name && <Text style={styles.name}>{personalInfo.name}</Text>}

                {(personalInfo.email || personalInfo.phone || personalInfo.location || personalInfo.links) && (
                    <View style={styles.sidebarSection}>
                        <Text style={styles.sidebarTitle}>PERSONAL INFO</Text>
                        {personalInfo.email && <Text style={styles.sidebarText}>{personalInfo.email}</Text>}
                        {personalInfo.phone && <Text style={styles.sidebarText}>{personalInfo.phone}</Text>}
                        {personalInfo.location && <Text style={styles.sidebarText}>{personalInfo.location}</Text>}
                        {personalInfo.links && (
                            <Link 
                                src={personalInfo.links.startsWith('http') ? personalInfo.links : `https://${personalInfo.links}`} 
                                style={styles.linksSmall}
                            >
                                {personalInfo.links}
                            </Link>
                        )}
                    </View>
                )}

                {skills && skills.length > 0 && skills.some(s => s && s.trim() !== '') && (
                    <View style={styles.sidebarSection}>
                        <Text style={styles.sidebarTitle}>SKILLS</Text>
                        {skills.filter(s => s && s.trim() !== '').map((skill, i) => (
                            <Text key={i} style={styles.skillItem}>• {skill}</Text>
                        ))}
                    </View>
                )}

                {education && education.length > 0 && education.some(edu => edu.degree || edu.school) && (
                    <View style={styles.sidebarSection}>
                        <Text style={styles.sidebarTitle}>EDUCATION</Text>
                        {education.filter(edu => edu.degree || edu.school).map((edu, i, arr) => (
                            <View key={i} style={{ marginBottom: i === arr.length - 1 ? 0 : 15 }}>
                                <View style={styles.itemHeader}>
                                    <Text style={[styles.itemBold, { fontSize: 10 }]}>{edu.degree}</Text>
                                    <Text style={[styles.itemDuration, { fontSize: 9 }]}>{edu.year}</Text>
                                </View>
                                <Text style={styles.sidebarSub}>{edu.school}</Text>
                            </View>
                        ))}
                    </View>
                )}
            </View>

            <View style={styles.mainContent}>
                {personalInfo.summary && (
                    <View style={styles.mainSection}>
                        <Text style={styles.mainTitle}>ABOUT</Text>
                        <Text style={styles.description}>{personalInfo.summary}</Text>
                    </View>
                )}

                {experience && experience.length > 0 && (
                    <View style={styles.mainSection}>
                        <Text style={styles.mainTitle}>EXPERIENCE</Text>
                        {experience.map((exp, i, arr) => (
                            <View key={i} style={[styles.contentItem, i === arr.length - 1 && { marginBottom: 0 }]} wrap={false}>
                                <View style={styles.itemHeader}>
                                    <Text style={styles.itemBold}>{exp.role || exp.jobTitle}</Text>
                                    <Text style={styles.itemDuration}>{exp.duration}</Text>
                                </View>
                                <Text style={styles.itemSub}>{exp.company}</Text>
                                <Text style={styles.description}>{exp.description}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {projects && projects.length > 0 && (
                    <View style={styles.mainSection}>
                        <Text style={styles.mainTitle}>PROJECTS</Text>
                        {projects.map((proj, i, arr) => (
                            <View key={i} style={[styles.contentItem, i === arr.length - 1 && { marginBottom: 0 }]} wrap={false}>
                                <View style={styles.itemHeader}>
                                    <Text style={styles.itemBold}>{proj.title}</Text>
                                    {proj.link && (
                                        <Link 
                                            src={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} 
                                            style={styles.linksSmall}
                                        >
                                            View Project
                                        </Link>
                                    )}
                                </View>
                                <Text style={styles.description}>{proj.description}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {achievements && achievements.length > 0 && (
                    <View style={styles.mainSection}>
                        <Text style={styles.mainTitle}>ACHIEVEMENTS</Text>
                        {achievements.map((ach, i, arr) => (
                            <View key={i} style={[styles.contentItem, i === arr.length - 1 && { marginBottom: 0 }]} wrap={false}>
                                <Text style={styles.itemBold}>{ach.title || ach.award}</Text>
                                <Text style={styles.description}>{ach.description}</Text>
                            </View>
                        ))}
                    </View>
                )}
            </View>
        </Page>
    );
};

export default CreativeLayout;
