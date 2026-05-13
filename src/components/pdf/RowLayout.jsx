import React from 'react';
import { Page, Text, View, StyleSheet, Image, Link } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        padding: '0.5in',
        fontFamily: 'Times-Roman',
        color: '#1a1a1a',
    },
    header: {
        textAlign: 'center',
        marginBottom: 8,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0f172a',
        marginBottom: 4,
    },
    contactInfo: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 12,
        fontSize: 9.5,
        color: '#475569',
    },
    links: {
        color: '#3b82f6',
        textDecoration: 'none',
    },
    section: {
        marginBottom: 0, 
    },
    sectionTitle: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#0f172a',
        textTransform: 'uppercase',
        borderBottomWidth: 1.5,
        borderBottomColor: '#1a1a1a',
        paddingBottom: 2,
        marginTop: 9, // Reduced from 18 to 9 (50% reduction)
        marginBottom: 8,
        letterSpacing: 0.5,
    },
    description: {
        fontSize: 10,
        color: '#334155',
        textAlign: 'justify',
        lineHeight: 1.4,
        marginTop: 4,
        marginBottom: 0, // Remove bottom margin to let sectionTitle handle it
    },
    skillsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
    },
    skillTag: {
        backgroundColor: '#f1f3f6',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 4,
        fontSize: 9.5,
        color: '#334155',
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: 2,
    },
    itemBold: {
        fontSize: 10.5,
        fontWeight: 'bold',
        color: '#0f172a',
    },
    itemDuration: {
        fontSize: 10,
        color: '#374151',
    },
    itemSub: {
        fontSize: 10,
        color: '#334155',
        fontStyle: 'italic',
        marginBottom: 4,
    },
    projectLink: {
        fontSize: 9.5, // Matches the website exactly
        color: '#3b82f6',
        textDecoration: 'none',
        marginLeft: 10,
    },
    contentItem: {
        marginBottom: 12, // Gap between items within a section
    }
});

const RowLayout = ({ data }) => {
    const { personalInfo = {}, skills = [], experience = [], education = [], projects = [], achievements = [] } = data;

    return (
        <Page size="A4" style={styles.page}>
            {/* Background Image Setup */}
            <Image
                src="/Resume Templates/simpleDesign.png"
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                fixed
            />

            <View style={styles.header}>
                {personalInfo.name && <Text style={styles.name}>{personalInfo.name}</Text>}
                <View style={styles.contactInfo}>
                    {personalInfo.email && <Text>{personalInfo.email}</Text>}
                    {personalInfo.phone && <Text>{personalInfo.phone}</Text>}
                    {personalInfo.location && <Text>{personalInfo.location}</Text>}
                    {personalInfo.links && (
                        <Link 
                            src={personalInfo.links.startsWith('http') ? personalInfo.links : `https://${personalInfo.links}`} 
                            style={styles.links}
                        >
                            {personalInfo.links}
                        </Link>
                    )}
                </View>
            </View>

            {personalInfo.summary && (
                <View style={styles.section} wrap={false}>
                    <Text style={styles.sectionTitle}>ABOUT</Text>
                    <Text style={styles.description}>{personalInfo.summary}</Text>
                </View>
            )}

            {skills && skills.length > 0 && skills.some(s => s && s.trim() !== '') && (
                <View style={styles.section} wrap={false}>
                    <Text style={styles.sectionTitle}>SKILLS</Text>
                    <View style={styles.skillsGrid}>
                        {skills.filter(s => s && s.trim() !== '').map((skill, i) => (
                            <Text key={i} style={styles.skillTag}>{skill}</Text>
                        ))}
                    </View>
                </View>
            )}

            {experience && experience.length > 0 && experience.some(exp => exp.role || exp.company) && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>EXPERIENCE</Text>
                    {experience.filter(exp => exp.role || exp.company).map((exp, i, arr) => (
                        <View key={i} style={[styles.contentItem, i === arr.length - 1 && { marginBottom: 0 }]} wrap={false}>
                            <View style={styles.itemHeader}>
                                <Text style={styles.itemBold}>{exp.role}</Text>
                                <Text style={styles.itemDuration}>{exp.duration}</Text>
                            </View>
                            <Text style={styles.itemSub}>{exp.company}</Text>
                            <Text style={styles.description}>{exp.description}</Text>
                        </View>
                    ))}
                </View>
            )}

            {education && education.length > 0 && education.some(edu => edu.degree || edu.school) && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>EDUCATION</Text>
                    {education.filter(edu => edu.degree || edu.school).map((edu, i, arr) => (
                        <View key={i} style={[styles.contentItem, i === arr.length - 1 && { marginBottom: 0 }]} wrap={false}>
                            <View style={styles.itemHeader}>
                                <Text style={styles.itemBold}>{edu.degree}</Text>
                                <Text style={styles.itemDuration}>{edu.year}</Text>
                            </View>
                            <Text style={styles.itemSub}>{edu.school}</Text>
                        </View>
                    ))}
                </View>
            )}

            {projects && projects.length > 0 && projects.some(proj => proj.title) && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>PROJECTS</Text>
                    {projects.filter(proj => proj.title).map((proj, i, arr) => (
                        <View key={i} style={[styles.contentItem, i === arr.length - 1 && { marginBottom: 0 }]} wrap={false}>
                            <View style={styles.itemHeader}>
                                <Text style={styles.itemBold}>{proj.title}</Text>
                                {proj.link && (
                                    <Link 
                                        src={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} 
                                        style={styles.projectLink}
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

            {achievements && achievements.length > 0 && achievements.some(ach => ach.title) && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>ACHIEVEMENTS</Text>
                    {achievements.filter(ach => ach.title).map((ach, i, arr) => (
                        <View key={i} style={[styles.contentItem, i === arr.length - 1 && { marginBottom: 0 }]} wrap={false}>
                            <Text style={styles.itemBold}>{ach.title}</Text>
                            <Text style={styles.description}>{ach.description}</Text>
                        </View>
                    ))}
                </View>
            )}
        </Page>
    );
};

export default RowLayout;
