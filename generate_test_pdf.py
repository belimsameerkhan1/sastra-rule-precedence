from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
import os

pdf_path = r"C:\Users\SAMEER\.gemini\antigravity\scratch\sastra-rule-precedence\sample_sutra_corpus.pdf"
artifact_pdf_path = r"C:\Users\SAMEER\.gemini\antigravity\brain\3b469c78-c0e8-48cd-8378-58f22c902879\sample_sutra_corpus.pdf"

doc = SimpleDocTemplate(pdf_path, pagesize=letter, rightMargin=36, leftMargin=36, topMargin=36, bottomMargin=36)
story = []
styles = getSampleStyleSheet()

title_style = ParagraphStyle(
    'DocTitle',
    parent=styles['Heading1'],
    fontName='Helvetica-Bold',
    fontSize=18,
    textColor=colors.HexColor('#4338ca'),
    spaceAfter=6
)

subtitle_style = ParagraphStyle(
    'DocSubTitle',
    parent=styles['Normal'],
    fontName='Helvetica-Oblique',
    fontSize=10,
    textColor=colors.HexColor('#475569'),
    spaceAfter=15
)

body_style = ParagraphStyle(
    'DocBody',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=9,
    leading=12,
    textColor=colors.HexColor('#1e293b')
)

bold_style = ParagraphStyle(
    'DocBold',
    parent=body_style,
    fontName='Helvetica-Bold',
    textColor=colors.HexColor('#0f172a')
)

story.append(Paragraph("Sastra Rule Precedence -- Test Rule Corpus Document", title_style))
story.append(Paragraph("Digitized Paninian Vyakaranasta Sutra-patha Rule Dataset | Version 1.0 (July 2026)", subtitle_style))
story.append(Spacer(1, 10))

# Table headers & data
data = [
    ["Ref", "Sutra Text (IAST)", "Context", "Condition", "Action", "Linked Paribhasa"],
    ["6.1.77", "iko yan aci", "ik (i, u, r, l)", "followed by ac (vowel)", "replace with yan (y, v, r, l)", "antaranga-bahiranga"],
    ["6.1.101", "akah savarne dirghah", "ak (a, i, u, r, l)", "followed by savarna ak", "replace both with dirgha", "utsarga-apavada"],
    ["6.1.87", "ad gunah", "a / a", "followed by ac (vowel)", "replace both with guna", "utsarga-apavada"],
    ["6.1.88", "vriddhir eci", "a / a", "followed by ec (e, ai, o, au)", "replace both with vriddhi", "utsarga-apavada"],
    ["6.1.78", "eco 'vayavah", "ec (e, o, ai, au)", "followed by ac (vowel)", "replace ec with ay, av, ay, av", "utsarga-apavada"],
    ["7.3.102", "supi ca", "anta a-anga", "followed by yan-adi sup", "lengthen final a to a", "nitya-anitya"],
    ["8.2.66", "sasajuso ruh", "pada-anta s / sajus", "pada-anta position", "replace s with ru (r)", "para"],
    ["8.3.15", "kharavasanayor visarjaniyah", "ru (r)", "followed by khar / avasana", "replace ru (r) with visarjaniya", "para"],
    ["1.1.1", "vriddhir adaic", "a, ai, au", "vriddhi samjna", "name vriddhi vowel", "samjna"],
    ["1.1.2", "adeng gunah", "at, e, o", "guna samjna", "name guna vowel", "samjna"]
]

table_data = []
for row_idx, row in enumerate(data):
    row_cells = []
    for col_idx, cell_text in enumerate(row):
        st = bold_style if row_idx == 0 else body_style
        row_cells.append(Paragraph(cell_text, st))
    table_data.append(row_cells)

t = Table(table_data, colWidths=[45, 110, 85, 100, 110, 90])
t.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#e0e7ff')),
    ('TEXTCOLOR', (0,0), (-1,0), colors.HexColor('#3730a3')),
    ('ALIGN', (0,0), (-1,-1), 'LEFT'),
    ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ('BOTTOMPADDING', (0,0), (-1,-1), 6),
    ('TOPPADDING', (0,0), (-1,-1), 6),
    ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#cbd5e1')),
    ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor('#f8fafc')])
]))

story.append(t)
story.append(Spacer(1, 15))

story.append(Paragraph("<b>Benchmark Test Derivation Input Cases:</b>", bold_style))
story.append(Paragraph("1. <b>sudhi + upasya</b> -&gt; sudhyupasya (Rule 6.1.77 vs 6.1.101 conflict resolved by antaranga-bahiranga)", body_style))
story.append(Paragraph("2. <b>agne + e</b> -&gt; agnaye (Rule 6.1.78 vs 6.1.77 conflict resolved by utsarga-apavada)", body_style))
story.append(Paragraph("3. <b>deva + alayah</b> -&gt; devalayah (Rule 6.1.101 vs 6.1.87 conflict resolved by apavada)", body_style))

doc.build(story)

# Also copy to artifact directory
import shutil
shutil.copy(pdf_path, artifact_pdf_path)

print("PDF successfully generated at:", pdf_path)
