import psycopg2

def get_db_connection():
    return psycopg2.connect(
        host="localhost",
        port="5432",
        dbname="hackurway_db",
        user="Sanket",
        password="Sanket7044"
    )
