"""Genera plan-crecimiento-instagram.pdf — Informática González."""
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
    KeepTogether,
    HRFlowable,
)

OUT = Path(__file__).resolve().parents[1] / "marketing" / "plan-crecimiento-instagram.pdf"

BLUE = colors.HexColor("#2563eb")
DARK = colors.HexColor("#0a0a0a")
GRAY = colors.HexColor("#525252")
LIGHT = colors.HexColor("#f5f5f5")
BORDER = colors.HexColor("#e5e5e5")
BG_TIP = colors.HexColor("#eff6ff")


def styles():
    base = getSampleStyleSheet()
    return {
        "hero_title": ParagraphStyle(
            "hero_title",
            parent=base["Heading1"],
            fontName="Helvetica-Bold",
            fontSize=20,
            textColor=colors.white,
            spaceAfter=4,
            leading=24,
        ),
        "hero_sub": ParagraphStyle(
            "hero_sub",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=10,
            textColor=colors.HexColor("#a3a3a3"),
            leading=14,
        ),
        "h2": ParagraphStyle(
            "h2",
            parent=base["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=11,
            textColor=BLUE,
            spaceBefore=14,
            spaceAfter=8,
            leading=14,
        ),
        "h3": ParagraphStyle(
            "h3",
            parent=base["Heading3"],
            fontName="Helvetica-Bold",
            fontSize=10,
            textColor=DARK,
            spaceBefore=8,
            spaceAfter=4,
        ),
        "body": ParagraphStyle(
            "body",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=9.5,
            textColor=GRAY,
            leading=13,
            spaceAfter=6,
        ),
        "bullet": ParagraphStyle(
            "bullet",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=9.5,
            textColor=GRAY,
            leading=13,
            leftIndent=12,
            spaceAfter=3,
        ),
        "cell": ParagraphStyle(
            "cell",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8.5,
            textColor=DARK,
            leading=11,
        ),
        "cell_h": ParagraphStyle(
            "cell_h",
            parent=base["Normal"],
            fontName="Helvetica-Bold",
            fontSize=8,
            textColor=GRAY,
            leading=10,
        ),
        "tip": ParagraphStyle(
            "tip",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=9.5,
            textColor=DARK,
            leading=13,
        ),
        "footer": ParagraphStyle(
            "footer",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8,
            textColor=GRAY,
        ),
    }


def table(data, col_widths):
    t = Table(data, colWidths=col_widths, hAlign="LEFT")
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), LIGHT),
                ("TEXTCOLOR", (0, 0), (-1, 0), GRAY),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("FONTSIZE", (0, 0), (-1, -1), 8.5),
                ("GRID", (0, 0), (-1, -1), 0.5, BORDER),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 6),
                ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
                ("BACKGROUND", (0, 1), (-1, -1), colors.white),
            ]
        )
    )
    return t


def hero_block(s):
    inner = [
        Paragraph("MARKETING · INSTAGRAM", ParagraphStyle(
            "badge", fontName="Helvetica-Bold", fontSize=8, textColor=BLUE, spaceAfter=6
        )),
        Paragraph("Plan de crecimiento de seguidores", s["hero_title"]),
        Paragraph(
            "<b>Informática González</b> · Estrategia orgánica + Meta Ads<br/>"
            "Julio 2026 · Visibilidad, seguidores de calidad y conversaciones por WhatsApp",
            s["hero_sub"],
        ),
    ]
    box = Table([[inner]], colWidths=[178 * mm])
    box.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), DARK),
                ("LEFTPADDING", (0, 0), (-1, -1), 14),
                ("RIGHTPADDING", (0, 0), (-1, -1), 14),
                ("TOPPADDING", (0, 0), (-1, -1), 14),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 14),
            ]
        )
    )
    return box


def tip_box(text, s):
    t = Table([[Paragraph(text, s["tip"])]], colWidths=[178 * mm])
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), BG_TIP),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
                ("LINEBEFORE", (0, 0), (0, 0), 3, BLUE),
            ]
        )
    )
    return t


def phase_cards(s):
    phases = [
        (
            "60%",
            "A · Descubrimiento",
            "Reproducciones o interacción.<br/>Creativo: Reel (web / 5 señales / caso).<br/>Meta: que te conozcan.",
        ),
        (
            "20%",
            "B · Perfil",
            "Visitas al perfil o interacción al mejor post.<br/>Solo creativos que ya rindieron.<br/>Presupuesto bajo.",
        ),
        (
            "20%",
            "C · Conversión",
            "Mensajes → WhatsApp.<br/>Apps y software para negocios.<br/>Clientes, no solo followers.",
        ),
    ]
    cells = []
    for pct, title, body in phases:
        cells.append(
            [
                Paragraph(f'<font color="#2563eb" size="16"><b>{pct}</b></font>', s["body"]),
                Paragraph(f"<b>{title}</b>", s["h3"]),
                Paragraph(body, s["body"]),
            ]
        )
    data = [[c for c in cells]]
    # Actually need 3 columns each with stacked content
    col_content = []
    for pct, title, body in phases:
        inner = Table(
            [
                [Paragraph(f'<font color="#2563eb" size="14"><b>{pct}</b></font>', s["body"])],
                [Paragraph(f"<b>{title}</b>", ParagraphStyle("pt", fontName="Helvetica-Bold", fontSize=9, textColor=DARK, spaceAfter=4))],
                [Paragraph(body, ParagraphStyle("pb", fontName="Helvetica", fontSize=8, textColor=GRAY, leading=11))],
            ],
            colWidths=[54 * mm],
        )
        inner.setStyle(
            TableStyle(
                [
                    ("BOX", (0, 0), (-1, -1), 0.5, BORDER),
                    ("LEFTPADDING", (0, 0), (-1, -1), 8),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                    ("TOPPADDING", (0, 0), (-1, -1), 8),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ]
            )
        )
        col_content.append(inner)

    wrap = Table([col_content], colWidths=[58 * mm, 58 * mm, 58 * mm])
    wrap.setStyle(TableStyle([("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 4), ("VALIGN", (0, 0), (-1, -1), "TOP")]))
    return wrap


def build():
    s = styles()
    doc = SimpleDocTemplate(
        str(OUT),
        pagesize=A4,
        leftMargin=16 * mm,
        rightMargin=16 * mm,
        topMargin=14 * mm,
        bottomMargin=14 * mm,
        title="Plan de crecimiento Instagram — Informática González",
        author="Informática González",
    )

    c = s["cell"]
    ch = s["cell_h"]
    story = []

    story.append(hero_block(s))
    story.append(Spacer(1, 10))
    story.append(
        tip_box(
            "<b>Resumen:</b> no optimizar solo a “visitas al perfil”. "
            "Encadenar <b>descubrimiento → valor → seguir → consulta</b>. "
            "Los anuncios aceleran el alcance; el contenido sostiene el crecimiento.",
            s,
        )
    )

    story.append(Paragraph("1. Estrategia orgánica (base)", s["h2"]))
    story.append(Paragraph("Frecuencia alineada a la grilla de contenido:", s["body"]))
    story.append(
        table(
            [
                [Paragraph("Canal", ch), Paragraph("Ritmo", ch), Paragraph("Enfoque", ch)],
                [Paragraph("Feed", c), Paragraph("Lunes · Miércoles · Viernes", c), Paragraph("Educativo, casos, servicios / CTA", c)],
                [Paragraph("Stories", c), Paragraph("Casi diario (1–3)", c), Paragraph("Encuestas, tips, behind the scenes", c)],
                [Paragraph("Reels", c), Paragraph("1–2 por semana", c), Paragraph("Tips + proyectos reales (más crecimiento)", c)],
            ],
            [35 * mm, 55 * mm, 88 * mm],
        )
    )
    story.append(
        Paragraph(
            "Lo que más sube seguidores: <b>Reels educativos + casos reales</b>, no solo posts estáticos.",
            s["body"],
        )
    )

    story.append(Paragraph("2. Publicidad: objetivos de Meta Ads", s["h2"]))
    story.append(
        table(
            [
                [Paragraph("Objetivo", ch), Paragraph("Para qué sirve", ch), Paragraph("¿Para seguidores?", ch)],
                [Paragraph("Visitas al perfil", c), Paragraph("Notoriedad rápida", c), Paragraph("Débil: muchos entran y no siguen", c)],
                [Paragraph("Interacción", c), Paragraph("Likes, guardados, comentarios", c), Paragraph("Mejor que visitas", c)],
                [Paragraph("Reproducciones / ThruPlay", c), Paragraph("Alcance barato con Reels", c), Paragraph("Bueno para descubrirte", c)],
                [Paragraph("Mensajes (WhatsApp)", c), Paragraph("Clientes y consultas", c), Paragraph("El más valioso para el negocio", c)],
                [Paragraph("Tráfico al sitio (/contacto)", c), Paragraph("Leads al formulario", c), Paragraph("Útil con el form activo", c)],
            ],
            [48 * mm, 65 * mm, 65 * mm],
        )
    )
    story.append(
        Paragraph(
            "<b>Recomendación:</b> no usar solo “visitas al perfil” como estrategia principal.",
            s["body"],
        )
    )

    story.append(Paragraph("3. Estructura de campañas (Mes 1)", s["h2"]))
    story.append(phase_cards(s))
    story.append(Spacer(1, 6))

    story.append(Paragraph("4. Presupuesto orientativo", s["h2"]))
    story.append(
        table(
            [
                [Paragraph("Nivel", ch), Paragraph("Diario", ch), Paragraph("Semanal", ch)],
                [Paragraph("Test", c), Paragraph("$3–5 USD", c), Paragraph("~$25–35", c)],
                [Paragraph("Activo", c), Paragraph("$8–15 USD", c), Paragraph("~$60–100", c)],
            ],
            [50 * mm, 64 * mm, 64 * mm],
        )
    )
    story.append(
        Paragraph(
            "Priorizar <b>1–2 creativos</b> (Reel + carrusel de señales), no muchos anuncios a la vez.",
            s["body"],
        )
    )

    story.append(Paragraph("5. Creativos listos para potenciar", s["h2"]))
    for item in [
        "• Carrusel “5 señales de que necesitas un sistema empresarial”",
        "• Reel scroll reveal de informaticagonzalez.com",
        "• Casos: Soluciones CGT, LogiTrack, servicios",
        "• Ángulo emprendedor juvenil: apps + software para negocios que quieren crecer",
    ]:
        story.append(Paragraph(item, s["bullet"]))

    story.append(Paragraph("6. KPIs a medir (Mes 1)", s["h2"]))
    story.append(
        table(
            [
                [Paragraph("Métrica", ch), Paragraph("Meta sugerida", ch)],
                [Paragraph("Publicaciones feed", c), Paragraph("12", c)],
                [Paragraph("Reels", c), Paragraph("4–6", c)],
                [Paragraph("Seguidores (orgánico + ads)", c), Paragraph("+80–150", c)],
                [Paragraph("Clics link en bio", c), Paragraph("20+", c)],
                [Paragraph("Conversaciones WhatsApp desde IG", c), Paragraph("3–5", c)],
                [Paragraph("Guardados en posts educativos", c), Paragraph("Idealmente > likes", c)],
            ],
            [110 * mm, 68 * mm],
        )
    )
    story.append(Paragraph("En Ads Manager, priorizar:", s["h3"]))
    for i, item in enumerate(
        [
            "Costo por visita al perfil",
            "% que sigue después de visitar (si Meta lo muestra)",
            "Guardados y compartidos",
            "Conversaciones de WhatsApp",
            "Clics al link en bio / formulario /contacto",
        ],
        1,
    ):
        story.append(Paragraph(f"{i}. {item}", s["bullet"]))

    story.append(Paragraph("7. Conclusión operativa", s["h2"]))
    story.append(
        tip_box(
            "<b>1.</b> Mantener la grilla orgánica (Lun / Mié / Vie + Stories + Reels).<br/>"
            "<b>2.</b> Ads: primeras campañas a <b>reproducciones / interacción</b> con Reels.<br/>"
            "<b>3.</b> Usar “visitas al perfil” solo como refuerzo del mejor creativo.<br/>"
            "<b>4.</b> Reservar parte del presupuesto a <b>WhatsApp</b> (clientes reales).<br/>"
            "<b>5.</b> Medir conversaciones y guardados, no solo seguidores.",
            s,
        )
    )

    story.append(Spacer(1, 16))
    story.append(HRFlowable(width="100%", thickness=0.5, color=BORDER))
    story.append(Spacer(1, 6))
    story.append(
        Paragraph(
            "Informática González · informaticagonzalez.com · Instagram @informatica.gonzalez",
            s["footer"],
        )
    )

    doc.build(story)
    print(f"PDF generado: {OUT}")


if __name__ == "__main__":
    build()
