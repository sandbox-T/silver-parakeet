```mermaid
flowchart TD
    Dev[💻 Developer Local] -- Push PR --&gt; Feat([Branch: feat/xyz])
    Feat -- Code Review + CI --&gt; Appr{✅ Aprobado?}
    Appr -- Merge --&gt; Main[🛡️ Main Branch]
    Main -- Auto Deploy --&gt; Stg[🟠 Staging Environment]
    Stg -- Test Manual OK --&gt; ProdReady{🚀 Listo para Prod?}
    ProdReady -- Git Tag v1.2.0 --&gt; Prod[🟢 Production Environment]

```