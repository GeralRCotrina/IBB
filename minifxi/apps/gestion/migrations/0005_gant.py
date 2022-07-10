# Generated by Django 2.1 on 2020-05-17 22:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gestion', '0004_colcategoria_requerimientos'),
    ]

    operations = [
        migrations.CreateModel(
            name='Gant',
            fields=[
                ('idgant', models.AutoField(primary_key=True, serialize=False)),
                ('fecha', models.DateField()),
                ('semana', models.IntegerField()),
                ('cod_req', models.CharField(max_length=15)),
                ('horas', models.FloatField()),
            ],
            options={
                'db_table': 'gant',
                'managed': False,
            },
        ),
    ]