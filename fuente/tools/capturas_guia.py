"""Capturas para la guía de instalación y uso (iPhone simulado, modo claro)."""
import functools, http.server, os, sys, threading
from playwright.sync_api import sync_playwright

DIST, OUT = sys.argv[1], sys.argv[2]
os.makedirs(OUT, exist_ok=True)
PORT = 8767
class Q(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a): pass
srv = http.server.ThreadingHTTPServer(("127.0.0.1", PORT), functools.partial(Q, directory=DIST))
threading.Thread(target=srv.serve_forever, daemon=True).start()
UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.6 Mobile/15E148 Safari/604.1"
STANDALONE = "Object.defineProperty(navigator, 'standalone', { get: () => true });"

with sync_playwright() as p:
    b = p.chromium.launch()
    def ctx(standalone):
        c = b.new_context(viewport={"width": 393, "height": 852}, device_scale_factor=2, is_mobile=True, has_touch=True, user_agent=UA, locale="es-CO", timezone_id="America/Bogota")
        if standalone: c.add_init_script(STANDALONE)
        c.grant_permissions(["notifications"], origin=f"http://127.0.0.1:{PORT}")
        return c
    # 1) En Safari, antes de instalar
    c = ctx(False); pg = c.new_page(); pg.goto(f"http://127.0.0.1:{PORT}/", wait_until="networkidle"); pg.wait_for_timeout(600)
    pg.screenshot(path=f"{OUT}/g01-safari-bienvenida.png")
    pg.locator('[data-act="go"][data-view="instalar"]').click(); pg.wait_for_timeout(500)
    pg.screenshot(path=f"{OUT}/g02-safari-instalar.png")
    c.close()
    # 2) Instalada: primera vez
    c = ctx(True); pg = c.new_page(); pg.goto(f"http://127.0.0.1:{PORT}/", wait_until="networkidle"); pg.wait_for_timeout(600)
    pg.screenshot(path=f"{OUT}/g03-bienvenida.png")
    pg.locator('[data-act="n0"]').click(); pg.wait_for_timeout(300); pg.screenshot(path=f"{OUT}/g04-quien.png")
    pg.locator('[data-act="who"][data-w="laura"]').click(); pg.wait_for_timeout(300)
    pg.locator('button.btn[data-act="n2"]').click(); pg.wait_for_timeout(300); pg.screenshot(path=f"{OUT}/g05-temas.png")
    pg.locator('[data-act="n3"]').click(); pg.wait_for_timeout(300)
    pg.locator('[data-act="n4"]').click(); pg.wait_for_timeout(700); pg.screenshot(path=f"{OUT}/g06-inicio.png")
    pg.locator('[data-act="menu"]').click(); pg.wait_for_timeout(500); pg.screenshot(path=f"{OUT}/g07-menu.png")
    pg.locator('.veil [data-act="mNombre"]').click(); pg.wait_for_timeout(500)
    pg.locator('[data-act="heart"]').nth(0).click(); pg.wait_for_timeout(200); pg.locator('[data-act="heart"]').nth(3).click(); pg.wait_for_timeout(300)
    pg.screenshot(path=f"{OUT}/g08-nombre.png")
    # En el navegador de prueba las notificaciones salen bloqueadas: se simula el estado de un celular real.
    pg.evaluate("Object.defineProperty(Notification, 'permission', { configurable: true, get: () => 'default' }); 1")
    pg.evaluate("APP.go('avisos', {}, {reset:true})"); pg.wait_for_timeout(500); pg.screenshot(path=f"{OUT}/g09-avisos.png")
    pg.evaluate("Object.defineProperty(Notification, 'permission', { configurable: true, get: () => 'granted' }); 1")
    muestra = "AVISO-eyJlIjoiaHR0cHM6Ly93ZWIucHVzaC5hcHBsZS5jb20vRVNUT19FU19VTl9FSkVNUExPIiwiayI6eyJwMjU2ZGgiOiJCRWplbXBsbyIsImF1dGgiOiJlamVtcGxvIn0sInEiOiJsYXVyYSIsImQiOiJpcGhvbmUifQ=="
    pg.evaluate(f"APP.go('avisos', {{codigo: '{muestra}'}}, {{reset:true}})"); pg.wait_for_timeout(500)
    pg.screenshot(path=f"{OUT}/g10-avisos-codigo.png")
    # 3) Uso diario
    pg.evaluate("APP.go('home', {}, {reset:true})"); pg.wait_for_timeout(400)
    pg.locator('button.btn.cta[data-act="paso"]').click(); pg.wait_for_timeout(600); pg.screenshot(path=f"{OUT}/g11-escena.png")
    pg.evaluate("APP.go('rafaga', {mode:'gemelos', n:8}, {reset:true})"); pg.wait_for_timeout(500)
    pg.locator('[data-act="pick"]').nth(0).click(); pg.wait_for_timeout(500); pg.screenshot(path=f"{OUT}/g12-gemelos.png")
    pg.evaluate("APP.go('memoria', {}, {reset:true})"); pg.wait_for_timeout(400); pg.screenshot(path=f"{OUT}/g13-memoria.png")
    pg.evaluate("APP.go('sim', {}, {reset:true})"); pg.wait_for_timeout(400); pg.screenshot(path=f"{OUT}/g14-simulacro.png")
    pg.locator('[data-act="corto"][data-k="func"]').click(); pg.wait_for_timeout(500)
    pg.locator('[data-act="pick"]').nth(1).click(); pg.locator('[data-act="fijar"]').click(); pg.wait_for_timeout(500)
    pg.screenshot(path=f"{OUT}/g15-marcado.png")
    pg.locator('[data-act="seg"]').nth(2).click(); pg.locator('[data-act="como"]').nth(1).click(); pg.wait_for_timeout(200)
    pg.locator('[data-act="sig"]').click(); pg.wait_for_timeout(400)
    pg.evaluate("APP.go('paseo', {caso: 'F06', resp: 1, step: 1}, {reset:true})"); pg.wait_for_timeout(1500); pg.screenshot(path=f"{OUT}/g16-paseo.png")
    pg.evaluate("APP.go('album', {}, {reset:true})"); pg.wait_for_timeout(400); pg.screenshot(path=f"{OUT}/g17-album.png")
    pg.evaluate("APP.go('stats', {}, {reset:true})"); pg.wait_for_timeout(400); pg.screenshot(path=f"{OUT}/g18-estadisticas.png")
    pg.evaluate("APP.go('respaldo', {}, {reset:true})"); pg.wait_for_timeout(400); pg.screenshot(path=f"{OUT}/g19-respaldo.png")
    c.close(); b.close()
srv.shutdown()
print("listo")
