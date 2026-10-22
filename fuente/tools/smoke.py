"""Prueba de humo de la app con Playwright: recorre la bienvenida, la misión completa, los simulacros
y todas las pantallas en un iPhone y un Samsung simulados. Guarda capturas y reporta errores."""
import functools, http.server, json, os, sys, threading, time
from playwright.sync_api import sync_playwright

DIST = sys.argv[1] if len(sys.argv) > 1 else "dist"
OUT = sys.argv[2] if len(sys.argv) > 2 else "shots"
PORT = 8765
os.makedirs(OUT, exist_ok=True)

Handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=DIST)
class Quiet(Handler.func):
    def log_message(self, *a): pass
srv = http.server.ThreadingHTTPServer(("127.0.0.1", PORT), functools.partial(Quiet, directory=DIST))
threading.Thread(target=srv.serve_forever, daemon=True).start()

DEVICES = {
    "iphone": dict(viewport={"width": 393, "height": 852}, device_scale_factor=3, is_mobile=True, has_touch=True,
                   user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.6 Mobile/15E148 Safari/604.1"),
    "samsung": dict(viewport={"width": 412, "height": 915}, device_scale_factor=2.625, is_mobile=True, has_touch=True,
                    user_agent="Mozilla/5.0 (Linux; Android 15; SM-S938B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Mobile Safari/537.36"),
}
STANDALONE = """
(() => {
  try { Object.defineProperty(navigator, 'standalone', { get: () => true }); } catch (e) {}
  const mm = window.matchMedia.bind(window);
  window.matchMedia = (q) => q.includes('display-mode: standalone') ? { matches: true, media: q, addListener(){}, removeListener(){}, addEventListener(){}, removeEventListener(){} } : mm(q);
})();
"""

problems = []

def run(dev, scheme, standalone=True, who="laura", full=True):
    tag = f"{dev}-{scheme}" + ("" if standalone else "-browser")
    with sync_playwright() as p:
        b = p.chromium.launch()
        ctx = b.new_context(color_scheme=scheme, locale="es-CO", timezone_id="America/Bogota", **DEVICES[dev])
        if standalone:
            ctx.add_init_script(STANDALONE)
        page = ctx.new_page()
        errs = []
        page.on("console", lambda m: errs.append(f"console.{m.type}: {m.text}") if m.type in ("error",) else None)
        page.on("pageerror", lambda e: errs.append(f"pageerror: {e}"))
        page.goto(f"http://127.0.0.1:{PORT}/", wait_until="networkidle")
        page.wait_for_function("document.getElementById('app').innerHTML.length > 0")
        n = [0]
        def shot(name):
            n[0] += 1
            page.wait_for_timeout(350)
            page.screenshot(path=f"{OUT}/{tag}-{n[0]:02d}-{name}.png", full_page=False)
        def click(sel, nth=0, wait=250):
            # Si una celebración tapa la pantalla y el objetivo no está en ella, se cierra primero.
            if page.locator(".veil").count() and page.locator(".veil " + sel).count() == 0 and not sel.startswith(".veil"):
                if page.locator('.veil [data-act="close"]').count():
                    shot("celebracion"); page.locator('.veil [data-act="close"]').first.click(); page.wait_for_timeout(300)
            loc = page.locator(sel)
            loc.nth(nth).click(timeout=8000)
            page.wait_for_timeout(wait)
        def has(sel):
            return page.locator(sel).count() > 0
        def dismiss(wait=700):
            page.wait_for_timeout(wait)
            for _ in range(15):
                if has('[data-act="nextLam"]'): click('[data-act="nextLam"]', wait=400)
                elif has('[data-act="okLams"]'): shot("laminas-juntas"); click('[data-act="okLams"]', wait=400)
                else: break
        shot("bienvenida")
        if not standalone:
            # En el navegador: la bienvenida pide instalar primero.
            if has('[data-act="aqui"]'):
                click('[data-act="go"][data-view="instalar"]'); shot("instalar")
                page.go_back(); page.wait_for_timeout(300)
            b.close(); return errs
        click('[data-act="n0"]'); shot("quien")
        click(f'[data-act="who"][data-w="{who}"]'); shot("proyecto")
        click('[data-act="n2"]'); shot("temas")
        click('[data-act="n3"]'); shot("tiempo")
        click('[data-act="n4"]', wait=500); shot("inicio")
        if not full:
            b.close(); return errs
        # ---- Misión completa ----
        guard = 0
        while has('.mission [data-act="paso"].next') or (has('button.btn.cta[data-act="paso"]')):
            guard += 1
            if guard > 8: problems.append(f"{tag}: la misión no terminó"); break
            click('button.btn.cta[data-act="paso"]', wait=400)
            view = page.evaluate("APP.current().name")
            if view == "escena":
                shot("escena")
                for _ in range(12):
                    if has('[data-act="more"]'): click('[data-act="more"]')
                    else: break
                shot("escena-prueba")
                click('[data-act="pick"]', nth=0); shot("escena-respuesta")
                click('[data-act="fin"]', wait=500); shot("lamina-nueva")
                dismiss(300)
            elif view == "rafaga":
                shot("rafaga")
                for i in range(20):
                    if has('[data-act="cont"]'): break
                    click('[data-act="pick"]', nth=i % 3, wait=300)
                    if i == 0: shot("rafaga-respuesta")
                    if has('[data-act="next"]'): click('[data-act="next"]', wait=250)
                shot("rafaga-fin")
                click('[data-act="cont"]', wait=500)
            elif view in ("simplay", "likert"):
                shot("afirmacion")
                for i in range(6):
                    if not has('[data-act="pick"]') or page.evaluate("APP.current().name") not in ("simplay", "likert"): break
                    click('[data-act="pick"]', nth=3 if i % 2 == 0 else 0)
                    click('[data-act="fijar"]', wait=400)
                    if i == 0: shot("marcado")
                    click('[data-act="comp"]', nth=0)
                    click('[data-act="seg"]', nth=0)
                    click('[data-act="sig"]', wait=400)
                    if i == 0: shot("retro-afirmacion")
                    click('[data-act="next"]', wait=600)
                    dismiss(300)
            else:
                problems.append(f"{tag}: paso abrió vista inesperada {view}"); break
            page.wait_for_timeout(500)
            if has('[data-act="abrir"]'):
                shot("mision-cumplida"); click('[data-act="abrir"]', wait=600); shot("cofre"); click('.veil [data-act="close"]', wait=300)
                break
        shot("inicio-tras-mision")
        # ---- Simulacro funcional corto ----
        page.evaluate("APP.go('sim', {}, {reset:true})"); page.wait_for_timeout(300); shot("sim")
        click('[data-act="corto"][data-k="func"]', wait=400); shot("sim-func")
        for i in range(4):
            click('[data-act="pick"]', nth=i % 3); click('[data-act="fijar"]', wait=300)
            if i == 0: shot("sim-func-marcado")
            click('[data-act="seg"]', nth=2); click('[data-act="como"]', nth=1)
            if i == 1:
                page.fill("#nota", "Dudé entre la A y la B por el plazo.")
            click('[data-act="sig"]', wait=500)
        dismiss()
        shot("sim-func-resultado")
        page.mouse.wheel(0, 900); page.wait_for_timeout(300); shot("sim-func-diagnostico")
        click('[data-act="paseo"]', nth=0, wait=400); shot("paseo-1")
        for k in range(6):
            if has('[data-act="nx"]'): click('[data-act="nx"]', wait=500); shot(f"paseo-{k+2}")
            else: break
        page.evaluate("APP.back()"); page.wait_for_timeout(300)
        # ---- Simulacro comportamental corto ----
        page.evaluate("APP.go('sim', {}, {reset:true})"); page.wait_for_timeout(300)
        click('[data-act="corto"][data-k="comp"]', wait=400)
        for i in range(10):
            if page.evaluate("APP.current().name") != "simplay": break
            click('[data-act="pick"]', nth=[3, 0, 1, 3, 0, 2, 3, 3, 0, 1][i]); click('[data-act="fijar"]', wait=300)
            click('[data-act="comp"]', nth=i % 6); click('[data-act="seg"]', nth=i % 2)
            if i == 0: shot("sim-comp-marcado")
            click('[data-act="sig"]', wait=500)
        dismiss()
        shot("sim-comp-resultado")
        page.mouse.wheel(0, 700); page.wait_for_timeout(300); shot("sim-comp-diagnostico")
        click('[data-act="paseo"]', nth=0, wait=400); shot("paseoL")
        page.mouse.wheel(0, 900); page.wait_for_timeout(300); shot("paseoL-abajo")
        # ---- Integridad: 2 puntos y salir ----
        page.evaluate("APP.go('sim', {}, {reset:true})"); page.wait_for_timeout(300)
        click('[data-act="corto"][data-k="integ"]', wait=400)
        click('[data-act="pick"]', nth=3); click('[data-act="fijar"]', wait=300); click('[data-act="comp"]', nth=0); click('[data-act="seg"]', nth=0); shot("sim-integ-marcado"); click('[data-act="sig"]', wait=400)
        click('[data-act="salir"]', wait=300); shot("sim-salir"); click('.veil [data-act="si"]', wait=600)
        dismiss()
        shot("sim-integ-parcial")
        # ---- Resto de pantallas ----
        for v in ["memoria", "mapas", "album", "stats", "logros", "instalar", "avisos", "nombre", "reporte", "respaldo", "temas", "novedades", "duelo"]:
            page.evaluate(f"APP.go('{v}', {{}}, {{reset:true}})"); page.wait_for_timeout(300); shot(v)
            if v == "nombre":
                click('[data-act="heart"]', nth=1); click('[data-act="tanda"]', nth=1, wait=300); shot("nombre-tanda2")
        page.evaluate("APP.go('escenas', {m:'m06-2'}, {reset:true})"); page.wait_for_timeout(300); shot("escenas-m2")
        page.evaluate("APP.go('mapas', {m:'m06-3'}, {reset:true})"); page.wait_for_timeout(300); shot("mapa-3")
        page.evaluate("APP.go('rafaga', {mode:'reloj'}, {reset:true})"); page.wait_for_timeout(300); shot("reloj")
        for i in range(5):
            if has('[data-act="pick"]:not([disabled])'): click('[data-act="pick"]:not([disabled])', nth=0, wait=900)
        page.evaluate("APP.go('home', {}, {reset:true})"); page.wait_for_timeout(300)
        click('[data-act="menu"]', wait=300); shot("menu")
        st = page.evaluate("JSON.stringify(APP.store.raw().errores || [])")
        if st != "[]": errs.append("errores guardados: " + st)
        b.close()
    return errs

results = {}
results["iphone-light"] = run("iphone", "light")
results["samsung-light"] = run("samsung", "light", who="juandavid")
results["iphone-dark"] = run("iphone", "dark", full=False)
results["iphone-browser"] = run("iphone", "light", standalone=False)
results["samsung-browser"] = run("samsung", "light", standalone=False)
for k, v in results.items():
    print(k, "OK" if not v else "ERRORES:")
    for e in v[:20]: print("   ", e[:400])
for pr in problems: print("PROBLEMA:", pr)
srv.shutdown()
