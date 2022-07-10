# Generated by Django 2.1 on 2020-05-29 15:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gestion', '0010_auto_20200526_2347'),
    ]

    operations = [
        migrations.CreateModel(
            name='Dudas',
            fields=[
                ('iddudas', models.AutoField(primary_key=True, serialize=False)),
                ('estado', models.CharField(max_length=1)),
                ('acc', models.CharField(blank=True, max_length=8, null=True)),
                ('descripcion', models.CharField(max_length=150)),
                ('respuesta', models.CharField(max_length=150)),
                ('rep_repuesta_proy', models.CharField(max_length=20)),
                ('rep_respuesta_cli', models.CharField(max_length=20)),
                ('fecha_prev_rep', models.DateField()),
                ('agrupacion', models.CharField(max_length=4)),
                ('id_realicionada', models.CharField(max_length=4)),
                ('ambito', models.CharField(max_length=1)),
                ('criticidad', models.CharField(max_length=1)),
                ('doc_entrada_incompleta', models.CharField(max_length=1)),
            ],
            options={
                'db_table': 'dudas',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='DudasFaseLoc',
            fields=[
                ('iddudas_fase_loc', models.AutoField(primary_key=True, serialize=False)),
                ('descripcion', models.CharField(max_length=45)),
            ],
            options={
                'db_table': 'dudas_fase_loc',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='DudasRelalivaA',
            fields=[
                ('iddudas_relaliva_a', models.AutoField(primary_key=True, serialize=False)),
                ('descripcion', models.CharField(max_length=45)),
            ],
            options={
                'db_table': 'dudas_relaliva_a',
                'managed': False,
            },
        ),
    ]
