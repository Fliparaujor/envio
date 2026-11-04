# Exportar artes do Figma (instruções para um agente)
1. ToolSearch "select:mcp__Figma__get_screenshot". sessionId: 060a35df-fe36-4e13-ad41-3e845c249120
2. Linhas a exportar: `awk -F'\t' '$1=="<slug>"' /home/user/envio/scan/EXPORT_TODO.tsv` (colunas: slug, fileKey, nodeId, maxDimension, name).
   Pule nós que já existem: /home/user/envio/assets/work/<slug>/<nodeId com ":"→"-">_th.webp
3. Em lotes de 5–8 nós: chame get_screenshot(fileKey, nodeId, maxDimension=<coluna>, sessionId) em paralelo numa mesma mensagem
   (NÃO use enableBase64Response). Logo em seguida, num único Bash, rode para cada resultado:
   python3 /home/user/envio/scripts/grab.py <slug> <nodeId> "<image_url>"
   As URLs expiram rápido — baixe imediatamente após cada lote.
4. Se o Figma recusar por limite de taxa, espere 20–60 s (use `sleep` curto num Bash, ex. `sleep 30`) e tente de novo esse lote.
   Se um nó específico falhar 3 vezes (ex.: nó inexistente), anote e siga.
5. Ao final: `ls /home/user/envio/assets/work/<slug> | grep -c _th` para cada slug e responda numa linha por slug: exportados/total + nodeIds que falharam.
Não faça git commit. Não edite outros arquivos.
