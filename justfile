
alias i := institutions
default:
  just --list

institutions:
  curl "http://localhost:8080/api/pages/institutions" -u 'fabianmoronzirfas@protonmail.ch:12345678' > public/data/institutions.json
