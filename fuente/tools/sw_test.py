"""Prueba del service worker: funciona sin internet y se actualiza sola a una versión nueva."""
import functools, http.server, json, os, shutil, subprocess, sys, threading, time
from playwright.sync_api import sync_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = sys.argv[1]
PORT = 8766

class Q(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a): pass
    def end_headers(self):
        self.send_header("Cache-Control", "max-age=600")  # como GitHub Pages
        super().end_headers()
srv = http.server.ThreadingHTTPServer(("127.0.0.1", PORT), functools.partial(Q, directory=SITE))
threading.Thread(target=srv.serve_forever, daemon=True).start()

def build(version):
    cfgp = os.path.join(ROOT, "config/app.json")
    cfg = json.load(open(cfgp)); orig = dict(cfg)
    cfg["version"] = version; json.dump(cfg, open(cfgp, "w"), ensure_ascii=False, indent=2)
    try: subprocess.run(["node", os.path.join(ROOT, "tools/build.js"), SITE], check=True, capture_output=True)
    finally: json.dump(orig, open(cfgp, "w"), ensure_ascii=False, indent=2)

build("2099-01-01.1")
with sync_playwright() as p:
    b = p.chromium.launch()
    ctx = b.new_context(viewport={"width": 393, "height": 852}, is_mobile=True, has_touch=True, locale="es-CO")
    page = ctx.new_page()
    logs = []
    page.on("console", lambda m: logs.append(m.text) if m.type == "error" else None)
    page.goto(f"http://127.0.0.1:{PORT}/", wait_until="networkidle")
    page.wait_for_function("navigator.serviceWorker && navigator.serviceWorker.controller !== null || true")
    page.wait_for_function("navigator.serviceWorker.ready.then(() => true)")
    page.wait_for_timeout(1500)
    page.reload(wait_until="networkidle"); page.wait_for_timeout(800)
    ctrl = page.evaluate("!!navigator.serviceWorker.controller")
    print("controlada por el SW:", ctrl, "versión:", page.evaluate("APP.cfg.version"))
    # Sin internet
    ctx.set_offline(True)
    page.reload(wait_until="load"); page.wait_for_timeout(1200)
    print("sin internet carga:", page.evaluate("document.getElementById('app').innerHTML.length > 100"), "· fuente:", page.evaluate("document.fonts.check('16px \"Bricolage Grotesque Variable\"')"))
    ctx.set_offline(False)
    page.evaluate("APP.setPerfil('laura'); APP.perfil().onboard = true; APP.store.save(); APP.go('home', {}, {reset: true})")
    page.wait_for_timeout(500)
    # Versión nueva publicada
    build("2099-01-02.1")
    page.reload(wait_until="networkidle")
    t0 = time.time(); v = None
    while time.time() - t0 < 25:
        page.wait_for_timeout(1000)
        try: v = page.evaluate("APP.cfg.version")
        except Exception: continue
        if v == "2099-01-02.1": break
        try:
            if page.locator(".update-bar button").count(): print("apareció la franja verde (no se aplicó sola)"); page.locator(".update-bar button").click()
        except Exception: pass
    print("actualizada sola a:", v, "en", round(time.time() - t0, 1), "s")
    page.wait_for_timeout(800)
    print("pantalla tras actualizar:", page.evaluate("APP.current().name"), "· perfil intacto:", page.evaluate("!!(APP.perfil() && APP.perfil().onboard)"))
    print("errores:", logs[:5])
    b.close()
srv.shutdown()
